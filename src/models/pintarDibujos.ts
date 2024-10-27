class PintarDibujos {
    constructor() {}
  
    public static pintaCirculo(ctx: CanvasRenderingContext2D, x: number, y: number, n: string) {
      const radio = 3; // Radio de 5 píxeles (10px de diámetro)
      ctx.fillStyle = 'blue'; // Cambiar el color del círculo a azul
      ctx.beginPath();
      ctx.arc(x + radio, y + radio, radio, 0, Math.PI * 2); // Círculo azul
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.stroke();
  
      ctx.fillStyle = 'green'; // Color del texto
      ctx.font = 'bold 10px monospace'; // Tamaño de fuente
      const textWidth = ctx.measureText(n).width; // Medir el ancho del texto
      ctx.fillText(n, x + (radio - textWidth / 2), y - 2); // Centrar el texto justo arriba del círculo
  }
  
    public static pintaLinea(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, _tam: number) {
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x1 + 2, y1 + 4);
      ctx.lineTo(x2 + 2 , y2 + 4);
      ctx.stroke();
  }
  
  
    public static pintaCamino(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x1 + 2, y1 + 4);
      ctx.lineTo(x2 + 2 , y2 + 4);
      ctx.stroke();
    }
  
    public static seleccionNodo(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
      const radio = 3; // Radio de 5 píxeles (10px de diámetro)
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x + radio, y + radio, radio, 0, Math.PI * 2); // Círculo azul
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
  
  export default PintarDibujos;
  