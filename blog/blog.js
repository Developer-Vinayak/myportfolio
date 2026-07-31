// ============================================
// SLIDE ANIMATION — BACK BUTTON
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const backBtn = document.getElementById('backBtn');
  const blogPage = document.getElementById('blogPage');

  // Back button functionality
  backBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Add exit animation class
    blogPage.classList.add('exit');
    
    // Wait for animation to complete, then go back
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 400);
  });

  // Handle browser back button
  window.addEventListener('popstate', function(e) {
    if (blogPage) {
      blogPage.classList.add('exit');
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 400);
    }
  });

  // Keyboard shortcut: Escape to go back
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      backBtn.click();
    }
  });

  // Click on blog cards (future: open individual post)
  document.querySelectorAll('.blog-card-full').forEach(card => {
    card.addEventListener('click', function() {
      const title = this.querySelector('h2')?.textContent || 'Blog Post';
      console.log(`📝 Opening: ${title}`);
      // Yahan tu individual blog page open kar sakta hai
      // window.location.href = `blog-post.html?slug=${slug}`;
    });
  });
});