// Blog functionality - search, filtering, archive
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const blogPosts = document.querySelectorAll('.blog-post-preview');
    const categoryLinks = document.querySelectorAll('[data-category]');

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            blogPosts.forEach(post => {
                const title = post.querySelector('.post-preview-title').textContent.toLowerCase();
                const excerpt = post.querySelector('.post-preview-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }

    // Category filtering
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            
            blogPosts.forEach(post => {
                const postCategory = post.querySelector('.post-category').textContent.toLowerCase();
                
                if (postCategory === category) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });

    // Populate recent posts (example - would be dynamic with Jekyll)
    // This is a placeholder - Jekyll will handle this
});
