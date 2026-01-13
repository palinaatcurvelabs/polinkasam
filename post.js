// Get the post slug from URL parameter
function getPostSlug() {
    const params = new URLSearchParams(window.location.search);
    return params.get('post');
}

// Use marked.js for markdown parsing
function parseMarkdown(text) {
    // Configure marked to allow HTML
    marked.setOptions({
        breaks: true,
        gfm: true
    });

    return marked.parse(text);
}

// Load the blog post
async function loadPost() {
    const slug = getPostSlug();

    if (!slug) {
        document.getElementById('post-content').innerHTML = '<p>Post not found.</p>';
        return;
    }

    try {
        // Load the index to find the post details
        const indexResponse = await fetch('writings/index.json');
        const entries = await indexResponse.json();

        // Find the entry with matching slug
        const entry = entries.find(e => e.slug === slug);

        if (!entry) {
            document.getElementById('post-content').innerHTML = '<p>Post not found.</p>';
            return;
        }

        // Load the markdown file
        const contentResponse = await fetch(`writings/${entry.file}`);
        const markdown = await contentResponse.text();

        // Update the page
        document.getElementById('page-title').textContent = `${entry.title} - polinkasam`;
        document.getElementById('post-title').textContent = entry.title;

        if (entry.date) {
            document.getElementById('post-date').textContent = entry.date;
        } else {
            document.getElementById('post-date').style.display = 'none';
        }

        const parsed = parseMarkdown(markdown);
        console.log('Parsed HTML (first 500 chars):', parsed.substring(0, 500));
        document.getElementById('post-content').innerHTML = parsed;

    } catch (error) {
        console.error('Error loading post:', error);
        document.getElementById('post-content').innerHTML = '<p>Error loading post.</p>';
    }
}

// Initialize
loadPost();
