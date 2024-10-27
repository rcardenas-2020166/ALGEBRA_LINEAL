class Nodo {
    private nombre: number;
    private visitado: boolean;
    private etiqueta: boolean;
    private acumulado: number;
    private predecesor: Nodo | null;

    constructor() {
        this.nombre = -1;
        this.visitado = false;
        this.etiqueta = false;
        this.acumulado = 0;
        this.predecesor = null;
    }

    // Getters
    public getNombre(): number {
        return this.nombre;
    }

    public isVisitado(): boolean {
        return this.visitado;
    }

    public isEtiqueta(): boolean {
        return this.etiqueta;
    }

    public getAcumulado(): number {
        return this.acumulado;
    }

    public getPredecesor(): Nodo | null {
        return this.predecesor;
    }

    // Setters
    public setNombre(nombre: number): void {
        this.nombre = nombre;
    }

    public setVisitado(visitado: boolean): void {
        this.visitado = visitado;
    }

    public setEtiqueta(etiqueta: boolean): void {
        this.etiqueta = etiqueta;
    }

    public setAcumulado(acumulado: number): void {
        this.acumulado = acumulado;
    }

    public setPredecesor(predecesor: Nodo | null): void {
        this.predecesor = predecesor;
    }
}

export default Nodo;
