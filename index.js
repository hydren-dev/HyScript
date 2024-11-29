const fs = require('fs');
const path = require('path');
const express = require('express');
const CatLoggr = require('cat-loggr');


const log = new CatLoggr();

class HyScript {
  constructor() {
    this.directory = null;
    this.app = express();
    this.definitions = {}; 
  }

  /**
   * Defines a reusable content block.
   * @param {string} name - The name of the content block.
   * @param {string} content - The content to be associated with the name.
   */
  define(name, content) {
    if (typeof name !== 'string' || typeof content !== 'string') {
      throw new Error('Both name and content must be strings.');
    }

    this.definitions[name] = content;
    log.init(`Adding ${name}`);
  }

  /**
   * Sets the directory containing `.hs` (JSON) files.
   * @param {string} dir - The directory path containing `.hs` files.
   */
  set(dir) {
    if (!fs.existsSync(dir)) {
      throw new Error(`Directory not found: ${dir}`);
    }
    if (!fs.statSync(dir).isDirectory()) {
      throw new Error(`The path provided is not a directory: ${dir}`);
    }

    this.directory = dir;
    log.init(`Directory set to: ${dir}`);
  }

  /**
   * Set the Static Directory Folder 
   * @param {string} folder - Folder to put on static,
   */

  static(folder) {
    const absolutePath = path.resolve(folder); // Get absolute path of the folder
  
    if (!fs.existsSync(absolutePath)) {
      log.error(`Directory not found for static files: ${absolutePath}`);
      return; // Exit if the folder doesn't exist
    }
  
    this.app.use(express.static(absolutePath)); // Serve the folder directly without prefix
    log.init(`Serving static files from: ${absolutePath}`);
  }

  /**
   * Middleware to use defined content in `.hs` file rendering.
   * This is applied before sending the response.
   */
 /**
 * Middleware to use defined content in `.hs` file rendering.
 * This is applied before sending the response.
 */
applyDefinitions(content) {
  // Replace placeholders in the content
  Object.keys(this.definitions).forEach((name) => {
      const placeholder = new RegExp(`\\[%==\\s*${name}\\s*==%\\]`, 'g'); // Match placeholder syntax
      if (placeholder.test(content)) {
          log.init(`Replacing placeholder [%== ${name} ==%] with defined content.`);
      }
      content = content.replace(placeholder, this.definitions[name] || ''); // Replace or leave empty if undefined
  });

  // Log warning if unprocessed placeholders remain
  const remainingPlaceholders = content.match(/\[%==\s*\w+\s*==%]/g);
  if (remainingPlaceholders) {
      log.warn(`Unprocessed placeholders found: ${remainingPlaceholders.join(', ')}`);
  }

  return content;
}

  /**
   * Starts the server and serves `.hs` files dynamically.
   * @param {number} port - Port to start the server on.
   * @param {string} message - Message to display when the server starts.
   */
  start(port, message) {
    // Middleware to serve `.hs` files
    this.app.get('/:file', (req, res) => {
      const fileName = req.params.file;
      const filePath = path.join(this.directory, `${fileName}.hs`);

      const notfoundpage = `
      <!DOCTYPE html>
<html lang="en" class="h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @font-face {
            font-family: 'Press Start 2P';
            src: url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        }
        .pixel-text {
            font-family: 'Courier New', monospace;
            font-weight: bold;
        }
    </style>
</head>
<body class="h-full">
    <div class="min-h-screen flex items-center justify-center bg-white dark:bg-black transition-colors duration-300">
        <div class="text-center px-4 space-y-8">
            <div class="flex items-center justify-center space-x-4">
                <div class="text-8xl pixel-text text-black dark:text-white">4</div>
                <div class="relative">
                    <i data-lucide="file-x" class="w-24 h-24 text-black dark:text-white"></i>
                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span class="text-2xl">×_×</span>
                    </div>
                </div>
                <div class="text-8xl pixel-text text-black dark:text-white">4</div>
            </div>

            <h1 class="text-2xl pixel-text text-black dark:text-white">page not found</h1>

            <div class="flex items-center justify-center space-x-4">
    <a href="javascript:history.back()" class="inline-flex items-center px-4 py-2 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200 rounded-md">
        <i data-lucide="arrow-left" class="w-4 h-4 mr-2"></i>
        Go Back
    </a>
  
</div>
            </div>
        </div>
    </div>

    <script>
        // Initialize Lucide icons
        lucide.createIcons();

        // Theme toggle function
        function toggleTheme() {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('darkMode', isDark);
        }
    </script>
</body>
</html>`

      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).send(notfoundpage);
      }

      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent.split('<!---Content--->')[0]);
        let content = fileContent.split('<!---Content--->')[1]?.trim();

        // Apply defined content placeholders
        content = this.applyDefinitions(content);

        const html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta name="description" content="${jsonData.meta || ''}">
              <title>${jsonData.title || 'Untitled'}</title>
              ${jsonData.logo ? `<link rel="icon" href="${jsonData.logo}">` : ''}
              ${jsonData.tailwindcss ? `<script src="https://cdn.tailwindcss.com"></script>` : ''}
          </head>
          <body ${jsonData.body ? `class="${jsonData.body}"` : ''}>
              ${content || ''}
          </body>
          </html>
        `;

        res.send(html);
    } catch (error) {
        log.error(`Error processing ${fileName}.hs:`, error.message);
        res.status(500).send('Internal server error');
    }
});

this.app.listen(port, () => {
    log.init(message);
});
}
}
// Exporting the package as a module
module.exports = HyScript;