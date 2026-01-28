// Simple image lightbox for mobile
document.addEventListener('DOMContentLoaded', function() {
    // Get all images in case study containers
    const images = document.querySelectorAll('.case-container img, .case-container-narrow img');
    
    images.forEach(img => {
        // Make images clickable
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function() {
            // Create lightbox overlay
            const lightbox = document.createElement('div');
            lightbox.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;';
            
            // Create image container
            const imgContainer = document.createElement('div');
            imgContainer.style.cssText = 'max-width:100%;max-height:100%;overflow:auto;';
            
            // Clone the clicked image
            const lightboxImg = this.cloneNode();
            lightboxImg.style.cssText = 'width:100%;height:auto;display:block;';
            
            imgContainer.appendChild(lightboxImg);
            lightbox.appendChild(imgContainer);
            
            // Close on click
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
            
            document.body.appendChild(lightbox);
        });
    });
});
