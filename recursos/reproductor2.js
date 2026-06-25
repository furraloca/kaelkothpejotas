jQuery(document).ready(function($) {
  // 1. Buscamos TODOS los contenedores de reproductor que existan en la página
  $('.reprodlinea').each(function() {
    const $contenedor = $(this);
    
    // 2. Buscamos los elementos internos SOLO dentro de este reproductor específico
    const audio = $contenedor.find('audio')[0] || $contenedor.find('#audio-track')[0];
    const btnPlay = $contenedor.find('.control-btn')[0];
    const barra = $contenedor.find('.progreso-llenado')[0] || $contenedor.find('#progreso-barra')[0];
    const contenedorProgreso = $contenedor.find('.progreso-container')[0] || $contenedor.find('#progreso-click')[0];
    const volumenSlider = $contenedor.find('#volumen-slider')[0];

    // Si este post en particular tiene audio y botón, lo configuramos
    if (btnPlay && audio) {
      
      // Forzamos el icono de Play al cargar
      btnPlay.textContent = '▶';

      // Control del clic en Play/Pause
      $(btnPlay).off('click').on('click', function() {
        if (audio.paused) {
          // Pausamos cualquier otro audio que esté sonando en el foro antes de reproducir este
          $('audio').each(function() { if(this !== audio) this.pause(); });
          $('.control-btn').not(btnPlay).text('▶');
          
          audio.play().catch(e => console.log("Error al reproducir:", e));
          btnPlay.textContent = '❚❚';
        } else {
          audio.pause();
          btnPlay.textContent = '▶';
        }
      });

      // Actualización de la barra de progreso
      audio.addEventListener('timeupdate', () => {
        if (barra && audio.duration) {
          const porcentaje = (audio.currentTime / audio.duration) * 100;
          barra.style.width = porcentaje + '%';
        }
      });

      // Clic en la barra para adelantar/atrasar
      if (contenedorProgreso) {
        contenedorProgreso.addEventListener('click', (e) => {
          const anchoTotal = contenedorProgreso.clientWidth;
          // Usamos getBoundingClientRect para evitar errores si hay elementos encima
          const rect = contenedorProgreso.getBoundingClientRect();
          const clickX = e.clientX - rect.left; 
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

      // Cuando termina la canción, vuelve a poner el icono de Play
      audio.addEventListener('ended', () => {
        btnPlay.textContent = '▶';
        if (barra) barra.style.width = '0%';
      });
    }
  });
});
