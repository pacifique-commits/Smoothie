// Copy Recipe Function
document.addEventListener('DOMContentLoaded', function() {
  // Initialize copy buttons
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const recipeCard = this.closest('.recipe-card');
      const recipeTitle = recipeCard.querySelector('h3').textContent;
      const recipeDetails = recipeCard.querySelector('.recipe-details').textContent;
      const recipeText = `${recipeTitle}\n\n${recipeDetails}`;
      
      navigator.clipboard.writeText(recipeText)
        .then(() => {
          const originalText = this.textContent;
          this.innerHTML = '<i class="fas fa-check"></i> Copied!';
          
          setTimeout(() => {
            this.textContent = originalText;
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy recipe: ', err);
        });
    });
  });

  // Form Submission
  const subscribeForm = document.getElementById('subscribeForm');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        alert(`Thank you for subscribing! We'll send recipes to ${emailInput.value}.`);
        this.reset();
      }
    });
  }

  // Smooth Scrolling for Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Lazy Loading Images
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('src');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }
});