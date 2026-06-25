jQuery(document).ready(function($) {
  const audio = document.getElementById('audio-track');
  const btnPlay = document.getElementById('play-pause-btn');
  const barra = document.getElementById('progreso-barra');
  const contenedorProgreso = document.getElementById('progreso-click');
  const volumenSlider = document.getElementById('volumen-slider');

  if (btnPlay && audio) {
    // Forzamos el icono de Play con código HTML seguro para Foroactivo
    btnPlay.innerHTML = '&#9654;';

    $(btnPlay).off('click').on('click', function() {
      if (audio.paused) {
        audio.play().catch(e => console.log("Error al reproducir:", e));
        btnPlay.innerHTML = '&#10074;&#10074;'; // Icono de pausa seguro (❚❚)
      } else {
        audio.pause();
        btnPlay.innerHTML = '&#9654;';
      }
    });

    audio.addEventListener('timeupdate', () => {
      if (barra && audio.duration) {
        const porcentaje = (audio.currentTime / audio.duration) * 100;
        barra.style.width = porcentaje + '%';
      }
    });

    if (contenedorProgreso) {
      contenedorProgreso.addEventListener('click', (e) => {
        const anchoTotal = contenedorProgreso.clientWidth;
        const clickX = e.offsetX;
        if (audio.duration) {
          audio.currentTime = (clickX / anchoTotal) * audio.duration;
        }
      });
    }

    if (volumenSlider) {
      volumenSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
      });
    }

    audio.addEventListener('ended', () => {
      btnPlay.innerHTML = '&#9654;';
      if (barra) barra.style.width = '0%';
    });
  }
});
