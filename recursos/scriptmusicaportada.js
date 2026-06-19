jQuery(document).ready(function($) {
  
  // Función principal que inicializa el reproductor
  function inicializarReproductor() {
    const audio = document.getElementById('audio-track');
    const btnPlay = document.getElementById('play-pause-btn');
    const barra = document.getElementById('progreso-barra');
    const contenedorProgreso = document.getElementById('progreso-click');
    const volumenSlider = document.getElementById('volumen-slider');

    // Validación: Si no encuentra el botón o el audio, no hace nada
    if (!btnPlay || !audio) return; 

    // Evitamos duplicar eventos si el script se recarga
    $(btnPlay).off('click').on('click', () => {
      if (audio.paused) {
        audio.play().catch(e => console.log("Error al reproducir:", e));
        btnPlay.textContent = '❚❚';
      } else {
        audio.pause();
        btnPlay.textContent = '▶';
      }
    });

    audio.addEventListener('timeupdate', () => {
      if (barra && audio.duration) {
        const porcentaje = (audio.currentTime / audio.duration) * 100;
        barra.style.width = `${porcentaje}%`;
      }
    });

    if (contenedorProgreso) {
      contenedorProgreso.addEventListener('click', (e) => {
        const anchoTotal = contenedorProgreso.clientWidth;
        const clickX = e.offsetX;
        const duracionTotal = audio.duration;
        if (duracionTotal) {
          audio.currentTime = (clickX / anchoTotal) * duracionTotal;
        }
      });
    }

    if (volumenSlider) {
      volumenSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
      });
    }

    audio.addEventListener('ended', () => {
      btnPlay.textContent = '▶';
      if (barra) barra.style.width = '0%';
    });
  }

  // 1. Ejecutar de inmediato al cargar la página
  inicializarReproductor();

  // 2. Truco para Foroactivo: Si hay cambios de página por AJAX, lo volvemos a ejecutar
  $(document).ajaxComplete(function() {
    inicializarReproductor();
  });

});
