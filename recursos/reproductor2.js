(function() {
  // Función que se ejecuta repetidamente hasta encontrar el reproductor en la página
  var checkExist = setInterval(function() {
    var audio = document.getElementById('audio-track');
    var btnPlay = document.getElementById('play-pause-btn');
    var barra = document.getElementById('progreso-barra');
    var contenedorProgreso = document.getElementById('progreso-click');
    var volumenSlider = document.getElementById('volumen-slider');

    if (audio && btnPlay) {
      clearInterval(checkExist); // Paramos el bucle porque ya existen

      // Forzamos el texto inicial si está vacío
      if(!btnPlay.textContent.trim()) {
        btnPlay.textContent = '▶';
      }

      // Añadimos el evento de clic de forma nativa e independiente
      btnPlay.onclick = function() {
        if (audio.paused) {
          audio.play().then(function() {
            btnPlay.textContent = '❚❚';
          }).catch(function(e) {
            console.log("Error al reproducir, verifica que el enlace sea HTTPS:", e);
          });
        } else {
          audio.pause();
          btnPlay.textContent = '▶';
        }
      };

      // Actualizar barra de progreso
      audio.ontimeupdate = function() {
        if (barra && audio.duration) {
          var porcentaje = (audio.currentTime / audio.duration) * 100;
          barra.style.width = porcentaje + '%';
        }
      };

      // Saltos en la barra de progreso
      if (contenedorProgreso) {
        contenedorProgreso.onclick = function(e) {
          var anchoTotal = contenedorProgreso.clientWidth;
          var clickX = e.offsetX;
          if (audio.duration) {
            audio.currentTime = (clickX / anchoTotal) * audio.duration;
          }
        };
      }

      // Slider de Volumen
      if (volumenSlider) {
        volumenSlider.oninput = function(e) {
          audio.volume = e.target.value;
        };
      }

      // Al terminar
      audio.onended = function() {
        btnPlay.textContent = '▶';
        if (barra) barra.style.width = '0%';
      };
    }
  }, 100); // Revisa cada 100 milisegundos si ya cargó el HTML
})();
