class TalkbackControl {
  constructor() {
    this.isActive = true;
    this.statusEl = document.getElementById("status");
    this.voiceBtn = document.getElementById("voiceBtn");
    this.muteBtn = document.getElementById("muteBtn");

    this.init();
  }

  init() {
    // Animação inicial de boas-vindas
    this.welcome();

    // Event listeners
    this.voiceBtn.addEventListener("click", () => this.keepActive());
    this.muteBtn.addEventListener("click", () => this.deactivate());

    // Suporte completo a teclado
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        if (document.activeElement === this.voiceBtn) {
          this.keepActive();
        } else if (document.activeElement === this.muteBtn) {
          this.deactivate();
        }
      }
    });
  }

  welcome() {
    this.announce("Bem-vindo! Talkback ativo por padrão.");

    // Speech synthesis de boas-vindas
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        "Página carregada. Talkback ativo. Use os botões para controlar.",
      );
      utterance.lang = "pt-BR";
      speechSynthesis.speak(utterance);
    }
  }

  keepActive() {
    this.isActive = true;
    this.updateUI();
    this.announce("✅ Talkback mantido ATIVO");
  }

  deactivate() {
    this.isActive = false;
    this.updateUI();
    this.announce("❌ Talkback DESATIVADO");
  }

  updateUI() {
    if (this.isActive) {
      // Status ativo
      this.statusEl.innerHTML = `
                        <i class="bi bi-mic-fill fs-2 me-3"></i>
                        <span>✅ Talkback ATIVO - Navegação por voz liberada</span>
                    `;
      this.statusEl.className =
        "alert alert-success border-4 rounded-4 mb-4 p-4 fs-4 fw-semibold shadow d-flex align-items-center justify-content-center";

      // Botão manter ativo
      this.voiceBtn.innerHTML = `
                        <i class="bi bi-mic-fill fs-1 d-block mb-2"></i>
                        <span class="d-block h5 mb-0">✅ Manter Ativo</span>
                    `;
      this.voiceBtn.className =
        "btn btn-success btn-lg w-100 py-4 fs-3 fw-bold rounded-4 shadow-lg border-0 h-100 position-relative listening";
      this.voiceBtn.setAttribute("aria-pressed", "true");

      // Botão desativar
      this.muteBtn.disabled = false;
      this.muteBtn.innerHTML = `
                        <i class="bi bi-volume-mute-fill fs-1 d-block mb-2"></i>
                        <span class="d-block h5 mb-0">❌ Desativar</span>
                    `;
    } else {
      // Status inativo
      this.statusEl.innerHTML = `
                        <i class="bi bi-mic-mute fs-2 me-3 text-danger"></i>
                        <span>❌ Talkback DESATIVADO - Reative para usar voz</span>
                    `;
      this.statusEl.className =
        "alert alert-danger border-4 rounded-4 mb-4 p-4 fs-4 fw-semibold shadow d-flex align-items-center justify-content-center";

      // Botão ativar
      this.voiceBtn.innerHTML = `
                        <i class="bi bi-mic-mute-fill fs-1 d-block mb-2"></i>
                        <span class="d-block h5 mb-0">✅ Reativar</span>
                    `;
      this.voiceBtn.className =
        "btn btn-outline-success btn-lg w-100 py-4 fs-3 fw-bold rounded-4 shadow-lg border-0 h-100 position-relative";
      this.voiceBtn.setAttribute("aria-pressed", "false");

      // Botão desativar (desabilitado)
      this.muteBtn.disabled = true;
    }
  }

  announce(message) {
    const span = this.statusEl.querySelector("span");
    if (span) span.textContent = message;

    // Feedback auditivo
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = "pt-BR";
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  }
}

// Inicializa ao carregar
window.addEventListener("load", () => {
  window.talkbackControl = new TalkbackControl();
});
