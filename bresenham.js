// Algoritmo de Bresenham
function drawBresenhamLine(context, x0, y0, x1, y1, hex)
{

    x0 = float2int(x0);
    y0 = float2int(y0);
    x1 = float2int(x1);
    y1 = float2int(y1);

    var dx = Math.abs(x1 - x0);
    //console.log("dx = " + dx);
    var dy = Math.abs(y1 - y0);
    //console.log("dy = " + dy);


    // Se saca la diferencia de las x y y
    var sx = (x0 < x1) ? 1 : -1;
    var sy = (y0 < y1) ? 1 : -1;

    // dx -dy
    var err = dx - dy;

    // Mientras los puntos no sean iguales
    while(x0 != x1 || y0 != y1) {

        setPixel(context, x0, y0, hex);

        // 2(dx - dy)
        var e2 = 2 * err;

        // Dependiendo del valor de e2 se aumentan/reducen las x o y
        if (e2 > -dy){ 
        
            err -= dy; 
            x0 += sx;
        
        }
        
        if (e2 < dx){
            
            err += dx; 
            y0 += sy; 
        
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