export class Colaborador {
  constructor(
    public id: number,
    public nombre: string,
    public apellido: string,
    public posicion: string,
    public edad: number,
    public email: string,
    public empresaNombre: string,
    public departamentoNombre: string,
    public status: string,
    public usuario: string,
    public creadoPor: string,
    public creadoFecha: string,
    public modificadoPor: string,
    public modificadoFecha: string
  ) {}
}
