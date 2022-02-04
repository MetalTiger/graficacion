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

        /* if (pStart.x > pEnd.x || pStart.y > pEnd.y) {
                
            drawLine(context, pEnd.x, pEnd.y, pStart.x, pStart.y, "#197BBD"); // Se dibuja la linea

        }else{

            drawLine(context, pStart.x, pStart.y, pEnd.x, pEnd.y, "#197BBD"); // Se dibuja la linea

        } */
        //drawLine(context, pStart.x, pStart.y, pEnd.x, pEnd.y, "#197BBD"); // Se dibuja la linea
        //drawLine(context, 10, 24, 23, 6, "#197BBD"); // Se dibuja la linea

        
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

}

// Método para calcular la posición del mouse respecto al canvas y no a la ventana
function windowToCanvasCoord(canvas, x, y)
{
    var bbox = canvas.getBoundingClientRect(); // Se obtiene el tamaño absoluto del canvas en la pagina
    return { x: x - bbox.left * (canvas.width / bbox.width),   
             y: y - bbox.top * (canvas.height / bbox.height)
    }; // Se regresa un objeto que contiene la posoción x y y del mouse en el canvas
}

function drawLine(context, x0, y0, x1, y1, hex)
{

    if ( x0 > x1 || y0 > y1) {

        var auxX = x0;
        var auxY = y0;
        // En caso de que pase sus valores se intercambian
        y0 = y1;
        y1 = auxY;

        x0 = x1;
        x1 = auxX;


    }

    var dx = Math.abs(x1 - x0);
    console.log("dx = " + dx);
    var dy = Math.abs(y1 - y0);
    console.log("dy = " + dy);

    setPixel(context, x0, y0, hex);

    var Pk = (2 * dy) - dx;

    console.log("1.- Pk0 = (2*" + dy + ") - " + dx );

    console.log("2.- Pk0 = " + (2*dy) + " - " + dx );

    console.log("3.- Pk0 = " + Pk);

    var diffDoble = 2*(dy - dx);

    console.log("1.- diffDoble = 2*(" + dy + "-" + dx + ")");
    console.log("2.- diffDoble = 2*(" + (dy - dx) + ")");
    console.log("3.- diffDoble = " + 2*(dy - dx));

    var x = x0;
    var y = y0;

    if (diffDoble > 0) {
        
        for (i = 0; i < Math.abs(dx)-1; i++) {
        
            if (Pk < 0) {
    
                x++;
    
                setPixel(context, x, y, hex);
    
                Pk = Pk + 2*dy;
    
    
            }else{
        
                x++;
                y++;
    
                setPixel(context, x, y, hex);
    
               
                
                Pk = Pk + diffDoble;
    
                
    
                
        
            }
    
            console.log("Pk = " + Pk);
    
            
        }


    }else{

        for (i = 0; i < Math.abs(dx)-1; i++) {
        
            if (Pk < 0) {
    
                x++;
    
                setPixel(context, x, y, hex);
    
                Pk = Pk + 2*dy;
    
    
            }else{
        
                x++;
                y--;
    
                setPixel(context, x, y, hex);
    
               
                
                Pk = Pk - diffDoble;
    
                
    
                
        
            }
    
            console.log("Pk = " + Pk);
    
            
        }


    }

    

}

// Función que convierte de flotante a entero
function float2int (value)
{
    return value | 0;
}

// Función para definir un pixel
function setPixel(context, x,y, hex)
{
    
    //context.fillStyle = "rgba("+r+","+g+","+b+","+a+")"; // Se define el relleno RGBA
    context.fillStyle = hex; // Se define el relleno HEX
    context.fillRect( x, y, 2, 2 ); // Se dibuja un cuadrado
}