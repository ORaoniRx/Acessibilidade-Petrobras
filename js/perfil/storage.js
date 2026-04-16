document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificar se está logado e preencher o campo nome
    const nomeAtual = localStorage.getItem('usuarioLogado');
    const inputNome = document.getElementById('newName');
    
    if (nomeAtual) {
        inputNome.value = nomeAtual;
    } else {
        window.location.href = 'index.html'; // Se não tiver nome, volta pro login
    }

    // 2. Lógica para salvar alterações
    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const novoNome = document.getElementById('newName').value;
        const novaSenha = document.getElementById('newPassword').value;

        // Validar senha simples
        if (novaSenha.length < 3) {
            alert('A senha deve ser maior.');
            return;
        }

        // Salva os novos dados no localStorage
        // Nota: Em um sistema real, você enviaria isso para um servidor via API
        localStorage.setItem('usuarioLogado', novoNome);
        
        // Mostrar mensagem de sucesso
        const msg = document.getElementById('saveMessage');
        msg.classList.remove('d-none');

        // Feedback por voz (TalkBack do seu projeto)
        if (typeof speak === "function") {
            speak('Perfil atualizado com sucesso, ' + novoNome);
        }

        // Esconder mensagem após 3 segundos
        setTimeout(() => {
            msg.classList.add('d-none');
        }, 3000);
    });
});