function drawCircle(context, x0, y0, x1, y1) {
  
    var radio = x1 - x0; 

    var dy = y1 - y0;
  
    var x = radio * Math.cos(Math.PI / 180 * 0) + x0;
    var y = dy * Math.sin(Math.PI / 180 * 0) + y0;
  
    var xAnterior = x;
    var yAnterior = y;
  
    for (i = 0; i <= 360; i++) {
      x = radio * Math.cos(Math.PI / 180 * i) + x0;
      y = dy * Math.sin(Math.PI / 180 * i) + y0;
  
      drawBresenhamLine(context, xAnterior, yAnterior, x, y, "#197BBD");
  
      xAnterior = x;
      yAnterior = y;
  
    }
  
  }