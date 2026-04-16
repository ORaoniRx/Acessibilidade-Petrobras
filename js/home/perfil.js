document.addEventListener("DOMContentLoaded", () => {
  const nomeSalvo = localStorage.getItem("usuarioLogado");
  if (nomeSalvo) {
    // Altera o texto do dropdown do usuário
    const userDropdown = document.getElementById("userDropdown");
    userDropdown.innerHTML = `<i class="bi bi-person-circle me-1"></i> ${nomeSalvo}`;
  }
});