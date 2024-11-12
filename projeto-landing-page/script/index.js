function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector("span");
    if (answer.style.display === "none" || answer.style.display === "") {
      answer.style.display = "block";
      icon.textContent = "-";
    } else {
      answer.style.display = "none";
      icon.textContent = "+";
    }
  }
  function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Adiciona o efeito de rolagem suave
    });
}
