export const smoothScroll = (targetId, offset = 80) => {
  const targetElement = document.getElementById(targetId);
  
  if (targetElement) {
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// For navbar links specifically
export const handleNavClick = (e, href) => {
  e.preventDefault();
  
  if (href === '#top' || href === '#') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  
  const targetId = href.replace('#', '');
  smoothScroll(targetId);
};