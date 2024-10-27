class DatosGraficos {
    private MatrizCoeficiente: number[][] = Array(51).fill(null).map(() => Array(51).fill(0));
    private MatrizAdyacencia: number[][] = Array(51).fill(null).map(() => Array(51).fill(0));
    private cordenadaX: number[] = Array(51).fill(0);
    private cordenadaY: number[] = Array(51).fill(0);
    private nombre: string[] = Array(51).fill('');
    private enArbol: number[] = [];

    constructor() {
    }

    // Getters
    public getmCoeficiente(i: number, j: number): number {
        return this.MatrizCoeficiente[i][j];
    }

    public getmAdyacencia(i: number, j: number): number {
        return this.MatrizAdyacencia[i][j];
    }

    public getCordeX(i: number): number {
        return this.cordenadaX[i];
    }

    public getCordeY(i: number): number {
        return this.cordenadaY[i];
    }

    public getNombre(i: number): string {
        return this.nombre[i];
    }

    public getEnArbol(i: number): number {
        return this.enArbol[i];
    }

    // Setters
    public setmCoeficiente(i: number, j: number, mCoeficiente: number): void {
        this.MatrizCoeficiente[i][j] = mCoeficiente;
    }

    public setmAdyacencia(i: number, j: number, mAdyacencia: number): void {
        this.MatrizAdyacencia[i][j] = mAdyacencia;
    }

    public setCordeX(i: number, cordeX: number): void {
        this.cordenadaX[i] = cordeX;
    }

    public setCordeY(i: number, cordeY: number): void {
        this.cordenadaY[i] = cordeY;
    }

    public setNombre(i: number, nombre: string): void {
        this.nombre[i] = nombre;
    }

    public setEnArbol(i: number, enArbol: number): void {
        this.enArbol[i] = enArbol;
    }

    // Método para inicializar `enArbol`
    public crearEnArbol(i: number): void {
        this.enArbol = new Array(i).fill(0);
    }
}

export default DatosGraficos;
