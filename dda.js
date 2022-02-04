/* function main()  // Función principal
{
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var dragging = false; // Hace referencia a si se esta presionando el clic izquierdo
    var pStart, pEnd;   // Punto inicial y punto final

    // Evento que detecta el clic izquierdo
    canvas.addEventListener("mousedown", function (e)
    {
        dragging = !dragging;
        pStart = windowToCanvasCoord(canvas, e.clientX, e.clientY);
        pEnd = pStart;
        console.log("Click in (" + pStart.x + "," + pStart.y + ")");
    });
    
    // Evento que detecta cuando se suelta el clic izquierdo
    canvas.addEventListener("mouseup", function (e)
    {
        dragging = false;

        
    });

    canvas.addEventListener("mousemove", function (e)
    {
        if (dragging)
        {
            context.clearRect(0, 0, canvas.width, canvas.height); // Se limpia el canvas
            
            drawLine(context, pStart.x, pStart.y, pEnd.x, pEnd.y, "#197BBD"); // Se dibuja la linea
            
            pEnd = windowToCanvasCoord(canvas, e.clientX, e.clientY);

            //draw coordinates position into canvas
            context.font = "10pt Arial";
            context.fillStyle = "rgba(50,50,50,1.0)";

            var pos = windowToCanvasCoord(canvas, float2int(e.clientX), float2int(e.clientY));
            
            var xint = float2int(pos.x);
            var yint = float2int(pos.y);
            
            var str = "(" + xint + "," + yint + ")";
            context.fillText(str, 10, 10);
        }
    });

} */

// Método para calcular la posición del mouse respecto al canvas y no a la ventana
/* function windowToCanvasCoord(canvas, x, y)
{
    var bbox = canvas.getBoundingClientRect(); // Se obtiene el tamaño absoluto del canvas en la pagina
    return { x: x - bbox.left * (canvas.width / bbox.width),   
             y: y - bbox.top * (canvas.height / bbox.height)
    }; // Se regresa un objeto que contiene la posoción x y y del mouse en el canvas
} */

function drawDDALine(context, x0, y0, x1, y1, hex)
{


    var dx = Math.abs(x1 - x0);
    var dy = Math.abs(y1 - y0);

    var M;


    // Cambiar puntos aqui, no antes 


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

        console.log("El valor de x0 es:" + x0);
        console.log("El valor de y0 es:" + y0);
        console.log("El valor de x1 es:" + x1);
        console.log("El valor de y1 es:" + y1);

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

// Función que convierte de flotante a entero
/* function float2int (value)
{
    return value | 0;
} */

// Función para definir un pixel
function setPixel(context, x,y, hex)
{
    
    //context.fillStyle = "rgba("+r+","+g+","+b+","+a+")"; // Se define el relleno RGBA
    context.fillStyle = hex; // Se define el relleno HEX
    context.fillRect( x, y, 2, 2 ); // Se dibuja un cuadrado
}