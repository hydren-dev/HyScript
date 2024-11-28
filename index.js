const fs = require('fs');
const path = require('path');
const express = require('express');

class HyScript {
  constructor() {
    this.directory = null;
    this.app = express();
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

    console.log(`Directory set to: ${dir}`);
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

      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
      }

      try {
        // Parse the JSON content of the `.hs` file
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);

        // Build the HTML response
        const html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta name="description" content="${jsonData.meta || ''}">
              <title>${jsonData.title || 'Untitled'}</title>
              ${jsonData.logo ? `<link rel="icon" href="${jsonData.logo}">` : ''}
          </head>
          <body>
              ${jsonData.content || ''}
          </body>
          </html>
        `;

        res.send(html);
      } catch (error) {
        console.error(`Error processing ${fileName}.hs:`, error.message);
        res.status(500).send('Internal server error');
      }
    });

    this.app.listen(port, () => {
      console.log(message);
      console.log(`Server running on http://localhost:${port}`);
    });
  }
}

// Exporting the package as a module
module.exports = HyScript;
