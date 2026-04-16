//Validação do Formulario
//Manipulacao de dados do formlário, só n tem onde enviar

document
  .getElementById("complaintForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Validação personalizada
    const form = e.target;
    if (form.checkValidity()) {
      speak("Reclamação enviada com sucesso! Você será redirecionado.");
      // Aqui você integraria com sua API
      alert(
        "✅ Reclamação registrada com sucesso!\n\nProtocolo: #2024-001\nStatus: Em análise",
      );
      form.reset();
    } else {
      speak("Por favor, preencha todos os campos obrigatórios.");
      form.reportValidity();
    }
  });

// Auto-foco no primeiro campo quando o card é visível
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.getElementById("subject").focus();
      observer.unobserve(entry.target);
    }
  });
});
observer.observe(document.querySelector(".card"));

//Limpar formulário automaticamente quando carregar a pagina
document.addEventListener('DOMContentLoaded', () => {
    const btnClear = document.getElementById('btnClear');
    if (btnClear) {
        btnClear.addEventListener('click', limparFormulario);
    }
});


//Função para limpar o formulário de reclamação
//e fornecer feedback visual e auditivo.

function limparFormulario() {
    // 1. Localiza o formulário pelo ID
    const formulario = document.getElementById('complaintForm');

    if (formulario) {
        // 2. Reseta todos os campos (input, select, textarea)
        formulario.reset();

        // 3. Feedback de Voz (reforçando a chamada que já existe no HTML)
        if (typeof speak === "function") {
            speak('O formulário foi limpo com sucesso.');
        }

        // 4. Opcional: Coloca o foco de volta no primeiro campo para acessibilidade
        document.getElementById('subject').focus();
        
        console.log("Formulário resetado com sucesso.");
    }
}