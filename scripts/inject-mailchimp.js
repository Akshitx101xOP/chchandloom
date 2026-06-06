const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..');
const scriptSnippet = `    <!-- Mailchimp Custom Website Code -->
    <script id="mcjs">!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/59600d0c84ad3a325e0512d1e/4d05aa414837968978685ccc9.js");</script>
`;

function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the script is already injected
    if (content.includes('id="mcjs"') || content.includes('4d05aa414837968978685ccc9.js')) {
        console.log(`Already injected in: ${path.basename(filePath)}`);
        return;
    }
    
    // Find the closing head tag
    const headTagRegex = /<\/head>/i;
    if (!headTagRegex.test(content)) {
        console.log(`No </head> tag found in: ${path.basename(filePath)}`);
        return;
    }
    
    // Inject the script snippet right before </head>
    const newContent = content.replace(headTagRegex, (match) => {
        return `${scriptSnippet}${match}`;
    });
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Successfully injected into: ${path.basename(filePath)}`);
}

// Read all files in target directory
const files = fs.readdirSync(targetDir);
files.forEach(file => {
    if (file.endsWith('.html') && file !== 'google9d3a4f43d8086aee.html') {
        const filePath = path.join(targetDir, file);
        processFile(filePath);
    }
});
