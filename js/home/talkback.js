        // Inicialização do TalkBack
        window.speechSynthesis.cancel();
        let voices = [];
        
        function initSpeech() {
            voices = window.speechSynthesis.getVoices();
            if (voices.length === 0) {
                speechSynthesis.onvoiceschanged = initSpeech;
            }
        }
        
        function speak(text) {
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'pt-BR';
                utterance.rate = 0.9;
                utterance.pitch = 1;
                speechSynthesis.speak(utterance);
            }
        }
        
        // Foco automático na página carregada
        window.addEventListener('load', function() {
            initSpeech();
            speak('Portal de atendimento acessível carregado. Use TAB para navegar.');
            document.querySelector('#main-content').focus();
        });