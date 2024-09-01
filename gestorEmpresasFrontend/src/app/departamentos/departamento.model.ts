export class Departamento {
  constructor(
    public id: number,
    public nombre: string,
    public direccion: string,
    public telefono: string,
    public empresaId: number,
    public descripcion: string,
    public status: string,
    public creadoPor: string,
    public modificadoPor: string
  ) {}
}
