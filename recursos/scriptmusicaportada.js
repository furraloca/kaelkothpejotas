document.addEventListener("DOMContentLoaded", () => {
  
  // AQUÍ PEGAS TODO TU CÓDIGO JAVASCRIPT ACTUAL
  const audio = document.getElementById('audio-track');
  const btnPlay = document.getElementById('play-pause-btn');
  const barra = document.getElementById('progreso-barra');
  const contenedorProgreso = document.getElementById('progreso-click');
  const volumenSlider = document.getElementById('volumen-slider');

  if (btnPlay && audio) { // Validación de seguridad
    btnPlay.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(e => console.log("Error al reproducir:", e));
        btnPlay.textContent = '❚❚';
      } else {
        audio.pause();
        btnPlay.textContent = '▶';
      }
    });

    audio.addEventListener('timeupdate', () => {
      const porcentaje = (audio.currentTime / audio.duration) * 100;
      barra.style.width = `${porcentaje}%`;
    });

    contenedorProgreso.addEventListener('click', (e) => {
      const anchoTotal = contenedorProgreso.clientWidth;
      const clickX = e.offsetX;
      const duracionTotal = audio.duration;
      if (duracionTotal) {
        audio.currentTime = (clickX / anchoTotal) * duracionTotal;
      }
    });

    volumenSlider.addEventListener('input', (e) => {
      audio.volume = e.target.value;
    });

    audio.addEventListener('ended', () => {
      btnPlay.textContent = '▶';
      barra.style.width = '0%';
    });
  }

});