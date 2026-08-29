document.addEventListener('DOMContentLoaded', function() {
  const backBtn = document.getElementById('backBtn');
  const blogPage = document.getElementById('blogPage');

  backBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    blogPage.classList.add('exit');
    
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 400);
  });

  window.addEventListener('popstate', function(e) {
    if (blogPage) {
      blogPage.classList.add('exit');
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 400);
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      backBtn.click();
    }
  });

});