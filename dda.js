
// Algoritmo DDA
function drawDDALine(context, x0, y0, x1, y1, hex)
{

    var dx = Math.abs(x1 - x0);
    var dy = Math.abs(y1 - y0);

    var M;

    if (dy > dx) {

        M = (x1 - x0) / (y1 - y0);
        
        // Se calculan las X
        // Se debe saber si y0 es mayor a y1, porque si esto pasa nunca entrara al ciclo for
        if (!(y0 <= y1)) {

            var auxX = x0;
            var auxY = y0;
            // En caso de que pase sus valores se intercambian
            y0 = y1;
            y1 = auxY;

            x0 = x1;
            x1 = auxX;


        }

        var x = x0;

        for (y = y0; y <= y1; y++)
        {

            setPixel(context, Math.round(x), y, hex);

            x += M;

        }

    } else {

        M = (y1 - y0) / (x1 - x0);

        // Se calculan las Y
        // Se debe saber si x0 es mayor a x1, porque si esto pasa nunca entrara al ciclo for
        if (!(x0 <= x1)) { 
            
            var auxY = y0;
            var auxX = x0;
            // En caso de que pase sus valores se intercambian
            x0 = x1;
            x1 = auxX;

            y0 = y1;
            y1 = auxY;
            
        }

        var y = y0;

        for (x = x0; x <= x1; x++)
        {
            
            setPixel(context, x, Math.round(y), hex);

            y += M;

        }

        
    }

}

// Función para definir un pixel
function setPixel(context, x,y, hex)
{
    
    //context.fillStyle = "rgba("+r+","+g+","+b+","+a+")"; // Se define el relleno RGBA
    context.fillStyle = hex; // Se define el relleno HEX
    context.fillRect( x, y, 2, 2 ); // Se dibuja un cuadrado
}