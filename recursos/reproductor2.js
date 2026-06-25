jQuery(document).ready(function($) {
  const audio = document.getElementById('audio-track');
  const btnPlay = document.getElementById('play-pause-btn');
  const barra = document.getElementById('progreso-barra');
  const contenedorProgreso = document.getElementById('progreso-click');
  const volumenSlider = document.getElementById('volumen-slider');

  if (btnPlay && audio) {
    // Forzamos el icono de Play inicial (Código HTML del triángulo)
    $(btnPlay).html('&#9654;');

    // Evento de click limpio
    $(btnPlay).off('click').on('click', function() {
      if (audio.paused) {
        audio.play().catch(e => console.log("Error al reproducir:", e));
        $(btnPlay).html('&#10074;&#10074;'); // Icono Pausa
      } else {
        audio.pause();
        $(btnPlay).html('&#9654;'); // Icono Play
      }
    });

    // Actualizar barra de progreso
    audio.addEventListener('timeupdate', () => {
      if (barra && audio.duration) {
        const porcentaje = (audio.currentTime / audio.duration) * 100;
        barra.style.width = porcentaje + '%';
      }
    });

    // Click en la barra para saltar tiempo
    if (contenedorProgreso) {
      contenedorProgreso.addEventListener('click', (e) => {
        const anchoTotal = contenedorProgreso.clientWidth;
        const clickX = e.offsetX;
        if (audio.duration) {
          audio.currentTime = (clickX / anchoTotal) * audio.duration;
        }
      });
    }

    // Control de volumen
    if (volumenSlider) {
      volumenSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
      });
    }

    // Al terminar la canción
    audio.addEventListener('ended', () => {
      $(btnPlay).html('&#9654;');
      if (barra) barra.style.width = '0%';
    });
  }
});
