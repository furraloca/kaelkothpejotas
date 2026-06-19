jQuery(document).ready(function($) {
  const audio = document.getElementById('audio-track');
  const btnPlay = document.getElementById('play-pause-btn');
  const barra = document.getElementById('progreso-barra');
  const contenedorProgreso = document.getElementById('progreso-click');
  const volumenSlider = document.getElementById('volumen-slider');

  if (btnPlay && audio) {
    $(btnPlay).off('click').on('click', function() {
      if (audio.paused) {
        audio.play().catch(e => console.log("Error al reproducir:", e));
        // Usamos innerHTML para que renderice las barras de pausa correctamente
        btnPlay.innerHTML = '&#10074;&#10074;'; 
      } else {
        audio.pause();
        btnPlay.innerHTML = '&#9654;';
      }
    });

    audio.addEventListener('timeupdate', () => {
      if (barra && audio.duration) {
        barra.style.width = ((audio.currentTime / audio.duration) * 100) + '%';
      }
    });

    if (contenedorProgreso) {
      contenedorProgreso.addEventListener('click', (e) => {
        if (audio.duration) {
          audio.currentTime = (e.offsetX / contenedorProgreso.clientWidth) * audio.duration;
        }
      });
    }

    if (volumenSlider) {
      volumenSlider.addEventListener('input', (e) => { audio.volume = e.target.value; });
    }

    audio.addEventListener('ended', () => {
      btnPlay.innerHTML = '&#9654;';
      if (barra) barra.style.width = '0%';
    });
  }
});
