<h1 align="center">HyScript</h1>
<div align="center">
<a href="https://github.com/hydren-dev/HyScript"><img src="https://hyscript.hydren.us.kg/favicon.ico" title="Logo" style="max-width:100%;" width="128" /></a>
</div>
**Next Generation Language**  

HyScript is a lightweight and dynamic server-side framework that allows you to easily create and serve web pages using `.hs` files written in JSON format.  

---

## Features  
- Serve `.hs` files as JSON-based templates for web pages.  
- Dynamic HTML generation with custom metadata, title, and content.  
- Minimal setup with an Express.js-based server.  

---

## Installation  

### Step 1: Install HyScript  
To use HyScript, first, initialize a Node.js project and install the package.  

```bash  
npm init -y  
npm install hyscript-latest
```  

---

## How to Create a Page  

### Step 1: Add an `index.js` File  
In your project directory, create an `index.js` file to set up and run your HyScript server.  

#### Example `index.js`:
```javascript  
const HyScript = require('hyscript-latest');  

const hy = new HyScript();  

// Set the directory containing `.hs` files  
hy.set('./pages');  

// Public Directory 
hy.static('public')

// Start the server on a specific port  
const PORT = 3000;  
hy.start(PORT, 'HyScript server is running!');  
```  

### Step 2: Create the `pages` Directory  
Create a folder in your project root named `pages`. This is where you will store your `.hs` files.  

### Step 3: Create `.hs` Files  
Each `.hs` file is a JSON file containing metadata and content for your web page. The `.hs` file structure allows you to define the page's title, meta description, logo, and whether Tailwind CSS should be included, followed by the actual HTML content.

#### Example `.hs` File (`home.hs`):

```json
{
  "title": "Home Page",
  "meta": "Welcome to our homepage.",
  "logo": "/favicon.ico",
  "tailwindcss": true
}
<!---Content--->
<h1>Welcome to HyScript!</h1>
<p>This is a dynamic page.</p>
```

#### Example `.hs` File (`about.hs`):

```json
{
  "title": "About Us",
  "meta": "Learn more about our company.",
  "logo": "/logo.png",
  "tailwindcss": false
}
<!---Content--->
<h1>Hello, This is your HyScript Example Page. Change this in about.hs!</h1>
<p>Welcome to the page. Customize the content as per your needs.</p>
```

In the example above:
- The JSON section contains metadata like the `title`, `meta`, `logo`, and whether to include Tailwind CSS.
- The HTML content comes after `<!---Content--->` and will be rendered on the page.

---

## Running the Server  

1. Navigate to your project directory:  
   ```bash  
   cd /path/to/your/project  
   ```  

2. Start the server:  
   ```bash  
   node index.js  
   ```  

3. Open your browser and visit:  
   - `http://localhost:3000/home` to see the `home.hs` page.  
   - `http://localhost:3000/about` to see the `about.hs` page.  

---

## Example Page

You Can Either Use [Example Website](https://github.com/hydren-dev/Example-HyScript) 
Editor at [Vscode for HS](https://hydren-dev.github.io/editor/hs)

## File Structure  

Your project folder should look like this:  

```
/project
  |-- /pages
  |     |-- home.hs
  |     |-- about.hs
  |
  |-- index.js
  |-- package.json
  |-- node_modules/
```  

---

## Example Output  

Visiting `http://localhost:3000/home` will render:  

```html  
<!DOCTYPE html>  
<html lang="en">  
<head>  
  <meta charset="UTF-8">  
  <meta name="viewport" content="width=device-width, initial-scale=1.0">  
  <meta name="description" content="Welcome to our homepage.">  
  <title>Home Page</title>  
  <link rel="icon" href="/favicon.ico">  
  <script src="https://cdn.tailwindcss.com"></script>  
</head>  
<body>  
  <h1>Welcome to HyScript!</h1>  
  <p>This is a dynamic page.</p>  
</body>  
</html>  
```  

Visiting `http://localhost:3000/about` will render:

```html  
<!DOCTYPE html>  
<html lang="en">  
<head>  
  <meta charset="UTF-8">  
  <meta name="viewport" content="width=device-width, initial-scale=1.0">  
  <meta name="description" content="Learn more about our company.">  
  <title>About Us</title>  
  <link rel="icon" href="/logo.png">  
</head>  
<body>  
  <h1>Hello, This is your HyScript Example Page. Change this in about.hs!</h1>  
  <p>Welcome to the page. Customize the content as per your needs.</p>  
</body>  
</html>  
```  

---

## Notes  
- `.hs` files must be valid JSON and contain at least `title`, `meta`, and `content`.  
- If `tailwindcss` is set to `true`, the CDN for Tailwind CSS will be included in the page.  
- Ensure the directory you pass to `.set()` contains your `.hs` files.  

---

## Contributing  
We welcome contributions to HyScript!  
Feel free to submit issues or pull requests to enhance the functionality.  

---

## License  
HyScript is released under the [MIT License](LICENSE).  

Enjoy using HyScript for your next-generation web projects! 🚀  
