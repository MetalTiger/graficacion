// Algoritmo Báisco
function drawBasicLine(context, x0, y0, x1, y1, hex)
{
    var dx = Math.abs(x0 - x1);
    var dy = Math.abs(y0 - y1);

    var M = (y1 - y0) / (x1 - x0);
    var B = y0 - M * x0;

    if (dy > dx) {
        
        // Se calculan las X
        // Se debe saber si y0 es mayor a y1, porque si esto pasa nunca entrara al ciclo for
        if (!(y0 <= y1)) {

            var auxY = y0;
            // En caso de que pase sus valores se intercambian
            y0 = y1;
            y1 = auxY;


        }

        if (x0 === x1) {
            
            for (y = y0; y <= y1; y++)
            {
                x = x0;
                
                setPixel(context, x, y, hex);
            }


        }else{

            for (y = y0; y <= y1; y++)
            {
                x = Math.round((y-B) / M);
                
                setPixel(context, x, y, hex);
            }

        }
    
    } else {

        // Se calculan las Y
        // Se debe saber si x0 es mayor a x1, porque si esto pasa nunca entrara al ciclo for
        if (!(x0 <= x1)) { 
            
            var auxX = x0;
            // En caso de que pase sus valores se intercambian
            x0 = x1;
            x1 = auxX;
            
            

        }

        for (x = x0; x <= x1; x++)
        {
            //y = y0 + dy * (x - x0) / dx;
            
            y = Math.round((M * x) + B);
            
            setPixel(context, x, y, hex);
        }

        
    }

}

// Función para definir un pixel
function setPixel(context, x,y, hex)
{
    
    context.fillStyle = hex; // Se define el relleno HEX
    context.fillRect( x, y, 2, 2 ); // Se dibuja un cuadrado
}