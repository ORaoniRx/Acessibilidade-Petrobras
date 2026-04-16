// Função para alternar Modo Escuro
function toggleDarkMode() {
    const isDark = document.getElementById('switchDarkMode').checked;
    if (isDark) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

// Função para alternar Modo Daltonismo
function toggleDaltonismo() {
    const isDaltonismo = document.getElementById('switchDaltonismo').checked;
    if (isDaltonismo) {
        document.body.classList.add('daltonismo-mode');
        localStorage.setItem('daltonismo', 'enabled');
    } else {
        document.body.classList.remove('daltonismo-mode');
        localStorage.setItem('daltonismo', 'disabled');
    }
}

// Função para Idioma (IA)
function updateLanguage() {
    const lang = document.getElementById('selectIdioma').value;
    localStorage.setItem('chatLanguage', lang);
    alert('A IA traduzirá o chat para este idioma na próxima mensagem.');
}

// Carregar configurações ao abrir a página
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.getElementById('switchDarkMode').checked = true;
        document.body.classList.add('dark-mode');
    }
    if (localStorage.getItem('daltonismo') === 'enabled') {
        document.getElementById('switchDaltonismo').checked = true;
        document.body.classList.add('daltonismo-mode');
    }
    const savedLang = localStorage.getItem('chatLanguage');
    if (savedLang) {
        document.getElementById('selectIdioma').value = savedLang;
    }
});