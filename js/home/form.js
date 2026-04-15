//Validação do Formulario

document.getElementById('complaintForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação personalizada
            const form = e.target;
            if (form.checkValidity()) {
                speak('Reclamação enviada com sucesso! Você será redirecionado.');
                // Aqui você integraria com sua API
                alert('✅ Reclamação registrada com sucesso!\n\nProtocolo: #2024-001\nStatus: Em análise');
                form.reset();
            } else {
                speak('Por favor, preencha todos os campos obrigatórios.');
                form.reportValidity();
            }
        });

        // Auto-foco no primeiro campo quando o card é visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.getElementById('subject').focus();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(document.querySelector('.card'));