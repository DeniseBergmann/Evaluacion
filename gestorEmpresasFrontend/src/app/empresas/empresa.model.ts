export class Empresa {
  constructor(
    public id: number,
    public nombre: string,
    public direccion: string,
    public telefono: string,
    public status: string,
    public creadoPor: string,
    public creadoFecha: string,
    public modificadoPor: string,
    public modificadoFecha: string
  ) {}
}
