function speak(text) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  }
}

window.addEventListener("load", function () {
  speak(
    "Página de acompanhamento de demandas carregada. Veja o status das suas solicitações.",
  );
});
