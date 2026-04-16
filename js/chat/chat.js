// js/home/chat.js (simulacao)

const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

// 1. Puxa o nome do usuário logado do LocalStorage (definido no login.js)
const usuarioLogado = localStorage.getItem('usuarioLogado') || 'Usuário Anônimo';

// 2. Puxa a preferência de idioma da IA (definida em configuracoes.html)
const idiomaIA = localStorage.getItem('chatLanguage') || 'pt';

// Função para simular a tradução por IA
function traduzirComIA(texto) {
    if (idiomaIA === 'pt') return texto;

    // Simulação de tradução baseada na escolha do usuário
    const dicionario = {
        'en': '[IA Translation]: ',
        'es': '[Traducción IA]: ',
        'fr': '[Traduction IA]: '
    };
    
    return (dicionario[idiomaIA] || '') + texto;
}

// Função para obter o número da semana atual
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

// Carrega mensagens e verifica se mudou a semana
function loadMessages() {
    const currentWeek = getWeekNumber(new Date());
    const savedWeek = localStorage.getItem('chat_week');

    if (savedWeek && savedWeek != currentWeek) {
        localStorage.removeItem('chat_messages');
    }
    localStorage.setItem('chat_week', currentWeek);

    const messages = JSON.parse(localStorage.getItem('chat_messages')) || [];
    chatWindow.innerHTML = '';
    
    messages.forEach(msg => {
        // Se a mensagem for de outro usuário, aplicamos a "tradução" se a IA estiver ativa
        if (msg.user !== usuarioLogado) {
            msg.text = traduzirComIA(msg.text);
        }
        appendMessage(msg);
    });
    
    scrollToBottom();
}

// Adiciona mensagem visualmente
function appendMessage(msg) {
    const div = document.createElement('div');
    // Se o usuário da mensagem for o logado, usa classe de 'enviado', senão 'recebido'
    const isMe = msg.user === usuarioLogado;
    div.className = `message ${isMe ? 'message-sent' : 'message-received'}`;
    
    div.innerHTML = `
        <strong style="font-size: 0.85rem">${msg.user}</strong>
        <div>${msg.text}</div>
        <span class="timestamp">${msg.time}</span>
    `;
    chatWindow.appendChild(div);
}

function scrollToBottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Evento de envio
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = userInput.value.trim();
    if (!text) return;

    const newMessage = {
        user: usuarioLogado, // AGORA USA O USUÁRIO DO JSON/LOGIN
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Salva no LocalStorage
    const messages = JSON.parse(localStorage.getItem('chat_messages')) || [];
    messages.push(newMessage);
    localStorage.setItem('chat_messages', JSON.stringify(messages));

    appendMessage(newMessage);
    userInput.value = '';
    scrollToBottom();
    
    // Feedback por voz (Talkback)
    if (typeof speak === "function") speak('Mensagem enviada');
});

// Inicializa
loadMessages();