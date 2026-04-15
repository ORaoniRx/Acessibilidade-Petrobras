//Simulação chat com usuario logado em localstorage

        const chatWindow = document.getElementById('chat-window');
        const chatForm = document.getElementById('chat-form');
        const userInput = document.getElementById('user-input');

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

            // Se a semana mudou, limpa o chat anterior
            if (savedWeek && savedWeek != currentWeek) {
                localStorage.removeItem('chat_messages');
            }
            localStorage.setItem('chat_week', currentWeek);

            const messages = JSON.parse(localStorage.getItem('chat_messages')) || [];
            chatWindow.innerHTML = '';
            messages.forEach(msg => appendMessage(msg));
            scrollToBottom();
        }

        // Adiciona mensagem visualmente
        function appendMessage(msg) {
            const div = document.createElement('div');
            div.className = `message ${msg.user === 'João Silva' ? 'message-sent' : 'message-received'}`;
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
                user: 'João Silva', // Simulando usuário logado
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
        });

        // Inicializa
        loadMessages();