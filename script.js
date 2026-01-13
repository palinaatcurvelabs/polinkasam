// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);

        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        document.getElementById(targetId).classList.add('active');
        window.history.pushState(null, '', `#${targetId}`);
    });
});

// Handle initial hash
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        const targetSection = document.getElementById(hash);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }
});

// Load blog entries
async function loadBlogEntries() {
    try {
        const response = await fetch('writings/index.json');
        const entries = await response.json();
        const blogContainer = document.getElementById('blog-entries');
        blogContainer.innerHTML = '';

        for (const entry of entries) {
            const article = document.createElement('article');
            article.className = 'blog-entry';
            article.style.cursor = 'pointer';

            // Get first paragraph of content as preview
            const contentResponse = await fetch(`writings/${entry.file}`);
            const content = await contentResponse.text();
            const preview = content.split('\n\n')[1] || content.split('\n\n')[0] || '';
            const previewText = preview.substring(0, 200) + (preview.length > 200 ? '...' : '');

            article.innerHTML = `
                <h3>${entry.title}</h3>
                ${entry.date ? `<div class="date">${entry.date}</div>` : ''}
                <div class="preview">${previewText}</div>
            `;

            // Make the entire article clickable
            article.addEventListener('click', () => {
                window.location.href = `post.html?post=${entry.slug}`;
            });

            blogContainer.appendChild(article);
        }
    } catch (error) {
        console.log('No writings/index.json found');
    }
}

// Load reading list
async function loadReadingList() {
    try {
        const response = await fetch('authors/index.json');
        const authors = await response.json();
        const listContainer = document.getElementById('reading-list');
        listContainer.innerHTML = '';

        authors.forEach(author => {
            const item = document.createElement('div');
            item.className = 'reading-item';
            item.innerHTML = `
                <h3>${author.name}</h3>
                <p>${author.notes || ''}</p>
            `;
            listContainer.appendChild(item);
        });
    } catch (error) {
        console.log('No authors/index.json found');
    }
}

// Simple markdown parser
function parseMarkdown(text) {
    return text
        .replace(/\n\n/g, '</p><p>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>')
        .replace(/^(.+)$/, '<p>$1</p>');
}

// Initialize
loadBlogEntries();
loadReadingList();
