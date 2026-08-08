export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId.replace(/^#/, ''));
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
