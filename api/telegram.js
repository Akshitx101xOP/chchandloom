export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({
      success: true,
      message: "Telegram API route is working 🚀",
    });
  }

  try {
    const body = req.body;
    const telegramMessage = body.message || {};
    const textMessage = telegramMessage.text;
    const captionMessage = telegramMessage.caption;
    const message = textMessage || captionMessage || "";
    const chatId = telegramMessage.chat?.id;
    const mediaGroupId = telegramMessage.media_group_id || "";
    const largestPhoto = Array.isArray(telegramMessage.photo) && telegramMessage.photo.length
      ? telegramMessage.photo[telegramMessage.photo.length - 1]
      : null;

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const OWNER = "Akshitx101xOP";
    const REPO = "chchandloom";
    const CATEGORIES = ["bedsheets", "curtains", "blankets", "comforters"];
    const FILE_PATHS = {
      bedsheets: "data/bedsheets.json",
      curtains:  "data/curtains.json",
      blankets:  "data/blankets.json",
      comforters: "data/comforters.json"
    };
    const PENDING_MEDIA_PATH = "data/pending-media-groups.json";
    // Normalize any user-typed variant → canonical key
    const CATEGORY_MAP = {
      bedsheet:           "bedsheets",
      bedsheets:          "bedsheets",
      curtain:            "curtains",
      curtains:           "curtains",
      blanket:            "blankets",
      blankets:           "blankets",
      comforter:          "comforters",
      comforters:         "comforters",
      "comforters & throws": "comforters",
      "comforters&throws":  "comforters",
      "comfortersthrows":   "comforters",
    };

    // -----------------------------
    // HELPERS
    // -----------------------------
    const fetchGitHubFile = async (path) => {
      const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;
      console.log(`[GitHub] Fetching: ${path}`);
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json" },
      });
      
      if (response.status === 404) {
        console.log(`[GitHub] File not found (404): ${path}. Returning empty array.`);
        return { data: [], sha: null };
      }
      
      if (!response.ok) {
        const errBody = await response.text();
        console.error(`[GitHub] Fetch failed for ${path}: ${response.status} ${response.statusText}`, errBody);
        throw new Error(`GitHub Fetch Error (${response.status}): ${path}`);
      }

      const data = await response.json();
      if (data.content) {
        const content = Buffer.from(data.content, "base64").toString("utf-8");
        try {
          return { data: JSON.parse(content), sha: data.sha };
        } catch (e) {
          console.error(`[GitHub] JSON Parse error for ${path}:`, e);
          return { data: [], sha: data.sha };
        }
      }
      return { data: [], sha: null };
    };

    const updateGitHubFile = async (path, content, sha, commitMsg) => {
      const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;
      console.log(`[GitHub] Updating: ${path} (SHA: ${sha || 'NEW'})`);
      
      const response = await fetch(url, {
        method: "PUT",
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json" },
        body: JSON.stringify({
          message: commitMsg,
          content: Buffer.from(JSON.stringify(content, null, 2)).toString("base64"),
          sha: sha || undefined
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error(`[GitHub] Update failed for ${path}: ${response.status}`, data);
        throw new Error(`GitHub Update Error (${response.status}): ${data.message || path}`);
      }
      return data;
    };

    const sendTelegramMessage = async (chatId, text) => {
      if (!chatId) return;
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" })
      });
      if (!response.ok) console.error("[Telegram] Failed to send message:", await response.text());
    };

    const sendTelegramPhoto = async (chatId, photo, caption) => {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendPhoto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, photo, caption })
      });
    };

    const isPlainObject = (value) => value && typeof value === "object" && !Array.isArray(value);

    const normalizePendingMedia = (value) => {
      if (!isPlainObject(value)) return {};
      return Object.fromEntries(
        Object.entries(value).map(([groupId, fileIds]) => [
          groupId,
          Array.isArray(fileIds) ? [...new Set(fileIds.filter(Boolean))] : []
        ])
      );
    };

    const isRetryableGitHubWriteError = (error) =>
      /GitHub Update Error \((409|422)\)/.test(error.message || "");

    const updateJsonWithRetry = async (path, defaultValue, commitMsg, mutate) => {
      let lastError;

      for (let attempt = 1; attempt <= 3; attempt += 1) {
        const { data, sha } = await fetchGitHubFile(path);
        const current = path === PENDING_MEDIA_PATH
          ? normalizePendingMedia(data)
          : (Array.isArray(data) ? data : defaultValue);
        const next = await mutate(current);

        if (next === null) {
          return { data: current, result: null, skipped: true };
        }

        try {
          const result = await updateGitHubFile(path, next, sha, commitMsg);
          return { data: next, result, skipped: false };
        } catch (error) {
          lastError = error;
          if (!isRetryableGitHubWriteError(error) || attempt === 3) {
            throw error;
          }
          console.warn(`[GitHub] Retrying ${path} after write conflict (attempt ${attempt + 1}/3)`);
        }
      }

      throw lastError;
    };

    const normalizeProductImages = (product) => {
      const images = [];

      const addImage = (image) => {
        if (!image) return;

        const normalized = typeof image === "string"
          ? { cardImage: image, detailImage: image }
          : {
              telegramFileId: image.telegramFileId || "",
              cardImage: image.cardImage || image.detailImage || image.image || "",
              detailImage: image.detailImage || image.cardImage || image.image || "",
            };

        if (!normalized.cardImage && !normalized.detailImage) return;

        const exists = images.some((existing) => {
          if (normalized.telegramFileId && existing.telegramFileId) {
            return normalized.telegramFileId === existing.telegramFileId;
          }
          return (
            normalized.detailImage &&
            existing.detailImage &&
            normalized.detailImage === existing.detailImage
          ) || (
            normalized.cardImage &&
            existing.cardImage &&
            normalized.cardImage === existing.cardImage
          );
        });

        if (!exists) images.push(normalized);
      };

      addImage({
        telegramFileId: product.primaryTelegramFileId || "",
        cardImage: product.cardImage || product.image || "",
        detailImage: product.detailImage || product.cardImage || product.image || "",
      });

      if (Array.isArray(product.images)) {
        product.images.forEach(addImage);
      }

      return images;
    };

    const mergeProductImage = (product, imageVariant) => {
      const images = normalizeProductImages(product);
      const alreadyExists = images.some((image) =>
        imageVariant.telegramFileId &&
        image.telegramFileId === imageVariant.telegramFileId
      );

      if (!alreadyExists) images.push(imageVariant);

      const primary = images[0] || imageVariant;

      return {
        ...product,
        image: primary.cardImage || primary.detailImage || "",
        cardImage: primary.cardImage || primary.detailImage || "",
        detailImage: primary.detailImage || primary.cardImage || "",
        primaryTelegramFileId: primary.telegramFileId || product.primaryTelegramFileId || "",
        images,
      };
    };

    const uploadTelegramPhotoVariants = async (fileId, slug, productId) => {
      if (!fileId) return null;

      const fileResponse = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_TOKEN}/getFile?file_id=${fileId}`
      );
      const fileData = await fileResponse.json();

      if (!fileData.ok) return null;

      const filePath = fileData.result.file_path;
      const telegramUrl = `https://api.telegram.org/file/bot${TELEGRAM_TOKEN}/${filePath}`;
      let productImage = "";

      try {
        const imageResponse = await fetch(telegramUrl);
        const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

        // sharp handles JPEG, PNG, WebP, HEIC natively — no file-type or heic-convert needed
        const sharp = require('sharp');
        const baseFileName = `${slug}-${productId}-${Date.now()}`;

        const imageWebpBuffer = await sharp(imageBuffer)
          .resize(1200, 1600, { fit: "inside", withoutEnlargement: true })
          .webp({ quality: 82 })
          .toBuffer();
        const imagePath = `images/products/${baseFileName}-image.webp`;
        const imageUpload = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${imagePath}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json" },
          body: JSON.stringify({
            message: `Upload product image for #${productId}`,
            content: imageWebpBuffer.toString("base64")
          }),
        });
        const imageData = await imageUpload.json();
        if (imageData.content) {
          productImage = `https://cdn.jsdelivr.net/gh/${OWNER}/${REPO}@main/${imagePath}`;
        }
      } catch (convError) {
        console.error("Image processing error:", convError);
      }

      return {
        telegramFileId: fileId,
        image: productImage || telegramUrl,
        cardImage: productImage || telegramUrl,
        detailImage: productImage || telegramUrl,
      };
    };

    const findProductByMediaGroupId = async (targetMediaGroupId) => {
      const fetched = await Promise.all(
        CATEGORIES.map(cat => fetchGitHubFile(FILE_PATHS[cat]).then(r => ({ cat, ...r })))
      );

      for (const { cat, data } of fetched) {
        const product = data.find((item) => item.telegramMediaGroupId === targetMediaGroupId);
        if (product) return { category: cat, product };
      }

      return null;
    };

    const stagePendingMediaGroupPhoto = async (targetMediaGroupId, fileId) => {
      await updateJsonWithRetry(
        PENDING_MEDIA_PATH,
        {},
        `Stage Telegram album photo for ${targetMediaGroupId}`,
        (pending) => {
          const currentIds = pending[targetMediaGroupId] || [];
          if (currentIds.includes(fileId)) return null;
          return {
            ...pending,
            [targetMediaGroupId]: [...currentIds, fileId],
          };
        }
      );
    };

    const removePendingMediaGroupPhoto = async (targetMediaGroupId, fileId) => {
      await updateJsonWithRetry(
        PENDING_MEDIA_PATH,
        {},
        `Clear Telegram album photo for ${targetMediaGroupId}`,
        (pending) => {
          const currentIds = pending[targetMediaGroupId] || [];
          if (!currentIds.includes(fileId)) return null;

          const nextIds = currentIds.filter((id) => id !== fileId);
          const next = { ...pending };
          if (nextIds.length) next[targetMediaGroupId] = nextIds;
          else delete next[targetMediaGroupId];
          return next;
        }
      );
    };

    const appendImageToProduct = async (category, productId, imageVariant, syncChatId) => {
      const update = await updateJsonWithRetry(
        FILE_PATHS[category],
        [],
        `Added extra image to product #${productId}`,
        (products) => {
          const index = products.findIndex((item) => String(item.id) === String(productId));
          if (index === -1) {
            throw new Error(`Product #${productId} disappeared before image attachment`);
          }

          const currentProduct = products[index];
          const currentImages = normalizeProductImages(currentProduct);
          const duplicate = currentImages.some((image) =>
            imageVariant.telegramFileId &&
            image.telegramFileId === imageVariant.telegramFileId
          );
          if (duplicate) return null;

          const nextProducts = [...products];
          nextProducts[index] = mergeProductImage(currentProduct, imageVariant);
          return nextProducts;
        }
      );

      if (!update.skipped) {
        await regenerateAllProducts(syncChatId, { [category]: update.data });
      }

      return update;
    };

    const attachOrStageMediaGroupPhoto = async (targetMediaGroupId, fileId, syncChatId) => {
      const found = await findProductByMediaGroupId(targetMediaGroupId);
      if (!found) {
        await stagePendingMediaGroupPhoto(targetMediaGroupId, fileId);
        return { action: "staged" };
      }

      const imageVariant = await uploadTelegramPhotoVariants(
        fileId,
        found.product.slug,
        found.product.id
      );

      if (!imageVariant) return { action: "ignored" };

      const update = await appendImageToProduct(
        found.category,
        found.product.id,
        imageVariant,
        syncChatId
      );

      return {
        action: update.skipped ? "already-attached" : "attached",
        productId: found.product.id,
      };
    };

    const attachPendingMediaGroupPhotos = async (targetMediaGroupId, syncChatId) => {
      const { data } = await fetchGitHubFile(PENDING_MEDIA_PATH);
      const pending = normalizePendingMedia(data);
      const fileIds = pending[targetMediaGroupId] || [];

      for (const fileId of fileIds) {
        const result = await attachOrStageMediaGroupPhoto(targetMediaGroupId, fileId, syncChatId);
        if (result.action !== "staged") {
          await removePendingMediaGroupPhoto(targetMediaGroupId, fileId);
        }
      }
    };

    // -----------------------------
    // REGENERATE all-products.json
    // Accepts a pre-built categoryMap (in-memory, already modified) to
    // avoid GitHub propagation race conditions after a write.
    // categoryMap: { bedsheets: [...], curtains: [...], rugs: [...], cushions: [...] }
    // For any category missing from the map, it fetches fresh from GitHub.
    // -----------------------------
    const regenerateAllProducts = async (chatId, categoryMap = {}) => {
      try {
        let all = [];
        console.log("[Sync] Regenerating all-products.json...");

        for (const cat of CATEGORIES) {
          let catData;

          if (categoryMap[cat] !== undefined) {
            catData = categoryMap[cat];
            console.log(`[Sync] Using in-memory data for: ${cat} (${catData.length} items)`);
          } else {
            const { data } = await fetchGitHubFile(FILE_PATHS[cat]);
            catData = data;
            console.log(`[Sync] Fetched fresh data for: ${cat} (${catData.length} items)`);
          }

          const tagged = catData.map(p => ({ ...p, category: cat }));
          all = all.concat(tagged);
        }

        all.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

        const { sha } = await fetchGitHubFile("data/all-products.json");
        await updateGitHubFile("data/all-products.json", all, sha, "Auto-regenerated all-products.json");
        console.log(`✅ all-products.json rebuilt with ${all.length} products`);
      } catch (err) {
        console.error("Error regenerating all-products.json:", err);
        if (chatId) await sendTelegramMessage(chatId, `⚠️ <b>Sync Error:</b> Product was updated, but the master index (all-products.json) failed to regenerate. <code>${err.message}</code>`);
        throw err; // Re-throw to trigger 500
      }
    };

    if (!message && largestPhoto && mediaGroupId) {
      const result = await attachOrStageMediaGroupPhoto(mediaGroupId, largestPhoto.file_id, chatId);
      return res.status(200).json({ success: true, ...result });
    }

    if (!message) {
      return res.status(200).json({ success: false, message: "No message found" });
    }

    // -----------------------------
    // SHOW PRODUCT COMMAND
    // -----------------------------
    if (message.toUpperCase().startsWith("SHOW PRODUCT:")) {
      const targetId = message.split(":")[1]?.trim();
      if (!targetId) return res.status(200).json({ success: false, message: "No ID provided" });

      console.log(`SEARCHING FOR PRODUCT ID: ${targetId}`);
      let foundProduct = null;

      for (const cat of CATEGORIES) {
        const { data } = await fetchGitHubFile(FILE_PATHS[cat]);
        const product = data.find(p => String(p.id) === String(targetId));
        if (product) {
          foundProduct = { ...product, category: cat };
          break;
        }
      }

      if (foundProduct) {
        await sendTelegramMessage(chatId,
`🆔 Product #${foundProduct.id}

📦 ${foundProduct.title}

💰 ₹${foundProduct.price}

🧵 ${foundProduct.material}

📏 ${foundProduct.sizes}

📝 ${foundProduct.description}

📸 ${foundProduct.image || 'No image found'}`);
      } else {
        await sendTelegramMessage(chatId, `❌ Product ID ${targetId} not found`);
      }

      return res.status(200).json({ success: true });
    }

    // -----------------------------
    // DELETE COMMAND
    // Accepts: DELETE:1000 | delete: 1000 | Delete:1000
    // -----------------------------
    const upperMsg = message.trim().toUpperCase();
    if (upperMsg.startsWith("DELETE")) {
      // Extract the ID — handle "DELETE:1000", "DELETE: 1000", "DELETE 1000"
      const idMatch = message.match(/delete[:\s]+(\d+)/i);
      const targetId = idMatch ? idMatch[1].trim() : null;

      if (!targetId) {
        await sendTelegramMessage(chatId, "❌ No ID found. Use: DELETE:1000");
        return res.status(200).json({ success: false, message: "No ID provided for delete" });
      }

      console.log(`ATTEMPTING DELETE FOR ID: ${targetId}`);
      await sendTelegramMessage(chatId, `🔍 Searching for product #${targetId}...`);

      let deleted = false;
      let foundCategory = "";

      // Fetch ALL category files in parallel for speed
      const fetched = await Promise.all(
        CATEGORIES.map(cat => fetchGitHubFile(FILE_PATHS[cat]).then(r => ({ cat, ...r })))
      );

      // Build map
      const categoryMap = {};
      for (const f of fetched) categoryMap[f.cat] = { data: f.data, sha: f.sha };

      // Find and remove the product
      for (const cat of CATEGORIES) {
        const { data, sha } = categoryMap[cat];
        const filtered = data.filter(p => String(p.id) !== String(targetId));

        if (filtered.length !== data.length) {
          const result = await updateGitHubFile(FILE_PATHS[cat], filtered, sha, `Deleted product #${targetId}`);
          if (result.content) {
            categoryMap[cat] = { data: filtered, sha };
            deleted = true;
            foundCategory = cat;
          } else {
            await sendTelegramMessage(chatId, `⚠️ Found product #${targetId} in ${cat} but GitHub write failed. Try again.`);
            return res.status(200).json({ success: false, message: "GitHub write failed" });
          }
          break;
        }
      }

      if (deleted) {
        const inMemoryMap = {};
        for (const cat of CATEGORIES) inMemoryMap[cat] = categoryMap[cat].data;
        await regenerateAllProducts(chatId, inMemoryMap);
        await sendTelegramMessage(chatId, `✅ Deleted product #${targetId} from "${foundCategory}".\n\nWebsite will update in ~30 seconds.`);
      } else {
        await sendTelegramMessage(chatId, `❌ Product #${targetId} not found in any category.\n\nUse SHOW PRODUCT:ID to verify the ID first.`);
      }

      return res.status(200).json({
        success: deleted,
        message: deleted ? `Deleted #${targetId} from ${foundCategory}` : `Product #${targetId} not found`
      });
    }


    // -----------------------------
    // ADD PRODUCT PARSER
    // -----------------------------
    const getValue = (label) => {
      const regex = new RegExp(`${label}:\\s*(.*)`, "i");
      const match = message.match(regex);
      return match ? match[1].trim() : "";
    };

    const rawCategory = getValue("CATEGORY").toLowerCase().trim().replace(/\s*&\s*/g, '&');
    const category = CATEGORY_MAP[rawCategory];
    if (!category) {
      if (getValue("TITLE") || getValue("PRICE")) {
        await sendTelegramMessage(chatId, "❌ Invalid category. Please use: bedsheets, curtains, blankets, or comforters.");
        return res.status(200).json({ success: false, message: "Invalid category" });
      }
      return res.status(200).json({ success: false, message: "Message is not a command or product" });
    }

    // Load ALL category files once to find max ID (avoids duplicate IDs)
    const allCategoryData = {};
    let maxId = 999;
    for (const cat of CATEGORIES) {
      const { data, sha } = await fetchGitHubFile(FILE_PATHS[cat]);
      allCategoryData[cat] = { data, sha };
      data.forEach(p => {
        if (p.id && !isNaN(p.id)) maxId = Math.max(maxId, parseInt(p.id));
      });
    }
    const newId = maxId + 1;

    // GENERATE SLUG
    const title = getValue("TITLE");
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');

    const primaryImage = largestPhoto
      ? await uploadTelegramPhotoVariants(largestPhoto.file_id, slug, newId)
      : null;
    const productImage = primaryImage?.image || primaryImage?.detailImage || primaryImage?.cardImage || "";

    const product = {
      id: newId,
      slug,
      category,
      title,
      price: getValue("PRICE"),
      description: getValue("DESCRIPTION"),
      material: getValue("MATERIAL"),
      sizes: getValue("SIZES"),
      primaryTelegramFileId: primaryImage?.telegramFileId || "",
      telegramMediaGroupId: mediaGroupId || "",
      images: primaryImage ? [primaryImage] : [],
      image: productImage,
      cardImage: productImage,
      detailImage: productImage,
      createdAt: new Date().toISOString(),
    };

    // Use the already-fetched category data (no second fetch)
    const { data: catData, sha: catSha } = allCategoryData[category];
    const updatedCatData = [...catData, product];
    const result = await updateGitHubFile(FILE_PATHS[category], updatedCatData, catSha, `Added new product #${newId}`);

    // Build in-memory map: updated category + unchanged others from already-fetched data
    const inMemoryMap = {};
    for (const cat of CATEGORIES) {
      inMemoryMap[cat] = cat === category ? updatedCatData : allCategoryData[cat].data;
    }

    // Regenerate all-products.json from in-memory (no race condition)
    await regenerateAllProducts(chatId, inMemoryMap);
    if (mediaGroupId) {
      await attachPendingMediaGroupPhotos(mediaGroupId, chatId);
    }
    await sendTelegramMessage(chatId, `✅ Successfully added Product #${newId}: ${product.title}\n🔗 Slug: ${slug}\n\n💡 Pro-tip: Use sensory storytelling in descriptions. Focus on warmth, texture, and how the fabric feels to elevate your brand perception.`);

    return res.status(200).json({ success: true, product, github: result });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
