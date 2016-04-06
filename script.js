//Установка начального положения шаров
  var balls = document.querySelectorAll('.ball');
  var left =0;
  for (var i = 0; i < balls.length; i++) {
    balls[i].style.left = left + 'px';
    left += 120; 
  };
  
  //Назначение обработчика
  document.onmousedown = function(event) {
    if(event.target.tagName != 'DIV') return;
    var ball = event.target;
    //Получить объект с координатами элемента с учетом прокрутки
    function getCoords(elem) { 
      var box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };

    }
    var coords = getCoords(ball);
    //Определить сдвиг шара по осям
    var shiftX = event.pageX - coords.left;
    var shiftY = event.pageY - coords.top;

    moveAt(event);

    ball.style.zIndex = 1000;

    //Перемещать шар с учетом сдвига
    function moveAt(event) {
      ball.style.left = event.pageX - shiftX + 'px';
      ball.style.top = event.pageY - shiftY + 'px';
    }

    document.onmousemove = function(event) {
      moveAt(event);
    }

    //Установить новое положение на момент отпускания кнопки мыши
    ball.onmouseup = function() {
      document.onmousemove = null;
      ball.onmouseup = null;
    }

    return false;
  }