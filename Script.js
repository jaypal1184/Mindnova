// Initial Data (Default posts if none exist)
const defaultPosts = [
    {
        id: 1,
        title: "Understanding Cognitive Biases",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
        description: "Explore the mental shortcuts that affect our decision-making.",
        category: "Psychology",
        views: 12500,
        date: "2024-01-15"
    }
];

// Load posts from LocalStorage or use defaults
let posts = JSON.parse(localStorage.getItem('mindnova_posts')) || defaultPosts;

// Function to Save Posts
function savePosts() {
    localStorage.setItem('mindnova_posts', JSON.stringify(posts));
    renderPosts();
}

// Function to Render Posts across different pages
function renderPosts() {
    const allGrid = document.getElementById('all-posts-grid');
    const adminList = document.getElementById('admin-posts-list');
    const homeNew = document.getElementById('home-new-posts');

    if (allGrid) {
        allGrid.innerHTML = posts.map(post => `
            <div class="glass-card rounded-2xl overflow-hidden border border-slate-700/50 card-hover group">
                <img src="${post.image}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <span class="text-red-400 text-xs font-bold">${post.category}</span>
                    <h3 class="text-xl font-bold text-white mt-2">${post.title}</h3>
                    <p class="text-slate-400 text-sm mt-2">${post.description}</p>
                </div>
            </div>
        `).join('');
    }

    if (adminList) {
        adminList.innerHTML = posts.map(post => `
            <div class="flex justify-between items-center p-4 bg-slate-800/50 rounded-xl mb-2">
                <span class="text-white">${post.title}</span>
                <button onclick="deletePost(${post.id})" class="text-red-500 hover:text-red-400">Delete</button>
            </div>
        `).join('');
    }
    
    lucide.createIcons();
}

// Admin: Add New Post
function handleAddPost(e) {
    e.preventDefault();
    const newPost = {
        id: Date.now(),
        title: document.getElementById('post-title').value,
        image: document.getElementById('post-image').value,
        description: document.getElementById('post-desc').value,
        category: document.getElementById('post-category').value,
        views: 0,
        date: new Date().toISOString().split('T')[0]
    };
    posts.unshift(newPost);
    savePosts();
    e.target.reset();
    alert("Post Live!");
}

// Admin: Delete Post
function deletePost(id) {
    if(confirm("Delete this post?")) {
        posts = posts.filter(p => p.id !== id);
        savePosts();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', renderPosts);

