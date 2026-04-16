document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Impede o recarregamento da página

    const usuarioInput = document.getElementById('usuario').value;
    const senhaInput = document.getElementById('senha').value;
    const errorDiv = document.getElementById('errorMessage');

    try {
        // Busca o "banco de dados" JSON
        const response = await fetch('users.json');
        const data = await response.json();

        // Procura o usuário no array
        const usuarioEncontrado = data.usuarios.find(u => 
            u.user === usuarioInput && u.senha === senhaInput
        );

        if (usuarioEncontrado) {
            // Salva o nome no localStorage para usar na home.html
            localStorage.setItem('usuarioLogado', usuarioEncontrado.nome);
            
            // Redireciona para a home
            window.location.href = 'home.html';
        } else {
            // Mostra mensagem de erro
            errorDiv.classList.remove('d-none');
            // Feedback por voz (mantendo seu padrão)
            if (typeof speak === "function") speak('Usuário ou senha incorretos');
        }
    } catch (error) {
        console.error('Erro ao carregar banco de dados:', error);
        alert('Erro técnico ao tentar logar. Verifique se o arquivo users.json existe.');
    }
});