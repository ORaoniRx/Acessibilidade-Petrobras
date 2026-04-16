// js/main.js

// Função para aplicar as preferências salvas
function aplicarPreferencias() {
    // 1. Verificar Tema (Dark Mode)
    const temaSalvo = localStorage.getItem('theme');
    if (temaSalvo === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    // 2. Verificar Modo Daltonismo
    const daltonismoSalvo = localStorage.getItem('daltonismo');
    if (daltonismoSalvo === 'enabled') {
        document.body.classList.add('daltonismo-mode');
    } else {
        document.body.classList.remove('daltonismo-mode');
    }

    // 3. Atualizar Nome do Usuário na Navbar (se existir o elemento)
    const nomeUsuario = localStorage.getItem('usuarioLogado');
    const userDropdown = document.getElementById('userDropdown');
    if (nomeUsuario && userDropdown) {
        userDropdown.innerHTML = `<i class="bi bi-person-circle me-1"></i> ${nomeUsuario}`;
    }
}

// Executa assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', aplicarPreferencias);

// funcao para sair do user logado.

function sair() {
    localStorage.removeItem('logadoNoDispositivo');
    localStorage.removeItem('nomeUsuario'); // limpa tudo
    window.location.href = 'index.html';
}
