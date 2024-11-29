{
  "title": "HyScript Example",
  "body": "bg-gray-100 text-gray-800 font-sans antialiased",
  "meta": "Welcome to our homepage.",
  "logo": "/favicon.ico",
  "tailwindcss": true
}
<!---Content--->
    <header class="bg-gray-900 text-white py-6">
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-3xl font-bold">HyScript</h1>
            <nav>
                <a href="#home" class="text-white hover:text-gray-300 mx-4">Home</a>
                <a href="#about" class="text-white hover:text-gray-300 mx-4">About</a>
                <a href="#contact" class="text-white hover:text-gray-300 mx-4">Contact</a>
            </nav>
        </div>
    </header>

    <!-- Main Section -->
    <main class="container mx-auto py-12 px-6">
        <section id="home" class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Example Page Built with HyScript</h2>
            <p class="text-lg text-gray-600 mb-6">
                This page is an example of how to use HyScript with Tailwind CSS for styling. It's a simple start
                to help you build your own pages with HyScript.
            </p>
            <p class="text-lg text-gray-600 font-semibold">
                Get Started by Changing <code class="bg-gray-300 text-gray-800 px-2 py-1 rounded">pages/home.hs</code>.
            </p>
        </section>

        <!-- About Section -->
        <section id="about" class="mb-12">
            <h3 class="text-3xl font-semibold text-gray-900 mb-4">About HyScript</h3>
            <p class="text-lg text-gray-600">
                HyScript is a modern scripting language designed to be lightweight and simple, with a focus on
                web development. This example page demonstrates the ease of integration with Tailwind CSS, providing
                responsive and user-friendly layouts.
            </p>
        </section>

        <!-- Contact Section -->
        <section id="contact">
            <h3 class="text-3xl font-semibold text-gray-900 mb-4">Contact</h3>
            <p class="text-lg text-gray-600">
                For more information or support with HyScript, feel free to reach out via the official website or 
                forums.
            </p>
        </section>
    </main>
