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

    var botonProbar = document.getElementById("Prueba");
    botonProbar.addEventListener("click", function(e){

        var espacio = 10;

        if (document.getElementById('Basica').checked) {
         

            console.time("Basico");

            for (let i = 0; i < 1000; i++) {
                
                if((i%espacio) === 0){

                    drawBasicLine(context, 0, i, 1000, i, "#197BBD"); // Horizontal
                    drawBasicLine(context, i, 0, i, 1000, "#197BBD"); // Vertical                    
                    drawBasicLine(context, i, 0, 0, i, "#197BBD"); // Esquina superior izquierda
                    drawBasicLine(context, i, 1000, 1000, i, "#197BBD"); // Esquina inferior derecha
                    drawBasicLine(context, 0, i, 1000-i, 1000, "#197BBD"); // Esquina inferior izquierda
                    drawBasicLine(context, i, 0, 1000, 1000-i, "#197BBD"); // Esquina superior derecha

                    
                } 

            }

            console.timeEnd("Basico");
            
        } else if(document.getElementById('DDA').checked){

            console.time("DDA");
            
            for (let i = 0; i < 1000; i++) {
                
                if((i%espacio) === 0){

                    drawDDALine(context, 0, i, 1000, i, "#00FF00"); // Horizontal
                    drawDDALine(context, i, 0, i, 1000, "#00FF00"); // Vertical                    
                    drawDDALine(context, i, 0, 0, i, "#00FF00"); // Esquina superior izquierda
                    drawDDALine(context, i, 1000, 1000, i, "#00FF00"); // Esquina inferior derecha
                    drawDDALine(context, 0, i, 1000-i, 1000, "#00FF00"); // Esquina inferior izquierda
                    drawDDALine(context, i, 0, 1000, 1000-i, "#00FF00"); // Esquina superior derecha

                    
                }

            }

            console.timeEnd("DDA");

        } else {

            console.time("Bresenham");
            
            for (let i = 0; i < 1000; i++) {
                
                if((i%espacio) === 0){

                    drawBresenhamLine(context, 0, i, 1000, i, "#FF0000"); // Horizontal
                    drawBresenhamLine(context, i, 0, i, 1000, "#FF0000"); // Vertical                    
                    drawBresenhamLine(context, i, 0, 0, i, "#FF0000"); // Esquina superior izquierda
                    drawBresenhamLine(context, i, 1000, 1000, i, "#FF0000"); // Esquina inferior derecha
                    drawBresenhamLine(context, 0, i, 1000-i, 1000, "#FF0000"); // Esquina inferior izquierda
                    drawBresenhamLine(context, i, 0, 1000, 1000-i, "#FF0000"); // Esquina superior derecha

                    
                }

            }

            console.timeEnd("Bresenham");

        }

    });

    var botonBorrar = document.getElementById("Borrar");
    botonBorrar.addEventListener("click", function(e){

        context.clearRect(0, 0, 1000, 1000);

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

