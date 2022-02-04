function main()  // Función principal
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

        if (document.getElementById('Basica').checked) {
                
            if (pStart.x > pEnd.x || pStart.y > pEnd.y) {
            
                drawBasicLine(context, pEnd.x, pEnd.y, pStart.x, pStart.y, "#197BBD"); // Se dibuja la linea
                
            }else{

                drawBasicLine(context, pStart.x, pStart.y, pEnd.x, pEnd.y, "#197BBD"); // Se dibuja la linea

            }
            
        } else if(document.getElementById('DDA').checked){

            drawDDALine(context, pStart.x, pStart.y, pEnd.x, pEnd.y, "#00FF00");

        } else {
            
            drawBresenhamLine(context, pStart.x, pStart.y, pEnd.x, pEnd.y, "#FF0000");

        }
      

    });

    canvas.addEventListener("mousemove", function (e)
    {
        if (dragging)
        {

            pEnd = windowToCanvasCoord(canvas, e.clientX, e.clientY);

        }
    });

}

// Método para calcular la posición del mouse respecto al canvas y no a la ventana
function windowToCanvasCoord(canvas, x, y)
{
    var bbox = canvas.getBoundingClientRect(); // Se obtiene el tamaño absoluto del canvas en la pagina
    return { x: x - bbox.left * (canvas.width / bbox.width),   
             y: y - bbox.top * (canvas.height / bbox.height)
    }; // Se regresa un objeto que contiene la posoción x y y del mouse en el canvas
}

// Función que convierte de flotante a entero
function float2int (value)
{
    return value | 0;
}

