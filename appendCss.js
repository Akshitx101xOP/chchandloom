const fs = require('fs');

const cssToAdd = `
/* Anti-CLS and Layout Shift Fixes */
.editorial-collage img,
.product-card img {
    aspect-ratio: 4 / 5;
    object-fit: cover;
    display: block;
}

@media (max-width: 768px) {
    .nav-container {
        min-height: 64px;
        height: 64px;
    }
    .btn,
    .nav-actions a {
        min-width: 120px;
        height: 40px;
    }
    .hero {
        min-height: 720px;
    }
}

@media (prefers-reduced-motion: no-preference) {
   .fade-up {
      animation: fadeUp 0.6s ease;
   }
}
`;

fs.appendFileSync('css/style.css', cssToAdd);
console.log("CSS fixes appended to style.css");
