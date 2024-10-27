import DatosGraficos from './datosGraficos';
import PintarDibujos from './pintarDibujos';
import Nodo from './nodo';

class AlgoritmoDijkstra {
  private arboles: DatosGraficos;
  private subTope: number = 0;
  private Nodoauxiliar: Nodo | null = null;
  private auxiliarAumulado: number = 0;
  private subtotalAcomulado: number = 0;
  private nodo: Nodo[];
  private tope: number;
  private Origen: number;
  private nodoFinal: number;
  private ctx: CanvasRenderingContext2D;

  constructor(arboles: DatosGraficos, tope: number, permanente: number, nodoFin: number, ctx: CanvasRenderingContext2D) {
    this.arboles = arboles;
    this.tope = tope;
    this.nodo = Array(tope).fill(null).map(() => new Nodo());
    this.Origen = permanente;
    this.nodoFinal = nodoFin;
    this.ctx = ctx;
  }

  public getAcumulado(): number {
    return this.nodo[this.nodoFinal].getAcumulado();
  }

  public getNombre(): number {
    return this.nodo[this.nodoFinal].getNombre();
  }

  public dijkstra() {

    for (let i = 0; i < this.tope; i++) // creacion del vector nodo del tamaño del numero de nodos pintados 
        {
            this.nodo[i] = new Nodo();
        }
    // Inicializar nodos y pintarlos
    this.nodo[this.Origen].setVisitado(true);
    this.nodo[this.Origen].setNombre(this.Origen);

    PintarDibujos.seleccionNodo(this.ctx, this.arboles.getCordeX(this.Origen), this.arboles.getCordeY(this.Origen), 'green');

    do {
      this.subtotalAcomulado = 0;
      this.auxiliarAumulado = Number.MAX_SAFE_INTEGER;
      this.nodo[this.Origen].setEtiqueta(true);
      for (let j = 0; j < this.tope; j++) {
        if (this.arboles.getmAdyacencia(j, this.Origen) === 1) {
          this.subtotalAcomulado = this.nodo[this.Origen].getAcumulado() + this.arboles.getmCoeficiente(j, this.Origen);
          if (this.subtotalAcomulado <= this.nodo[j].getAcumulado() && this.nodo[j].isVisitado() && !this.nodo[j].isEtiqueta()) {
            this.nodo[j].setAcumulado(this.subtotalAcomulado);
            this.nodo[j].setVisitado(true);
            this.nodo[j].setNombre(j);
            this.nodo[j].setPredecesor(this.nodo[this.Origen]);
          } else if (!this.nodo[j].isVisitado()) {
            this.nodo[j].setAcumulado(this.subtotalAcomulado);
            this.nodo[j].setVisitado(true);
            this.nodo[j].setNombre(j);
            this.nodo[j].setPredecesor(this.nodo[this.Origen]);
          }
        }
      }

      for (let i = 0; i < this.tope; i++) {
        if (this.nodo[i].isVisitado() && !this.nodo[i].isEtiqueta()) {
          if (this.nodo[i].getAcumulado() <= this.auxiliarAumulado) {
            this.Origen = this.nodo[i].getNombre();
            this.auxiliarAumulado = this.nodo[i].getAcumulado();
          }
        }
      }
      this.subTope++;
    } while (this.subTope < this.tope + 1);

    this.Nodoauxiliar = this.nodo[this.nodoFinal];
    while (this.Nodoauxiliar.getPredecesor()) {
      
      const predecesor = this.Nodoauxiliar.getPredecesor();
      const x1 = this.arboles.getCordeX(this.Nodoauxiliar.getNombre());
      const y1 = this.arboles.getCordeY(this.Nodoauxiliar.getNombre());
      PintarDibujos.seleccionNodo(this.ctx, x1, y1, 'blue');

      if (predecesor) {
        const x2 = this.arboles.getCordeX(predecesor.getNombre());
        const y2 = this.arboles.getCordeY(predecesor.getNombre());

        PintarDibujos.pintaCamino(this.ctx, x1, y1, x2, y2, 'purple');

        this.Nodoauxiliar = predecesor;
      }
    }
    PintarDibujos.seleccionNodo(
      this.ctx, 
      this.arboles.getCordeX(this.nodoFinal), 
      this.arboles.getCordeY(this.nodoFinal), 
      'red'
    );

  }

}

export default AlgoritmoDijkstra;
