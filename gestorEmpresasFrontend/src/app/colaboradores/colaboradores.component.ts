import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ColaboradoresService } from './colaboradores.service';
import { Colaborador } from './colaborador.model';
import { Empresa } from '../empresas/empresa.model';
import { Departamento } from '../departamentos/departamento.model';
import { EmpresasService } from '../empresas/empresas.service';
import { DepartamentosService } from '../departamentos/deparamentos.service';

@Component({
  selector: 'app-colaboradores',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export class ColaboradoresComponent implements OnInit {
  colaboradores: Colaborador[] = [];
  empresas: Empresa[] = [];
  departamentos: Departamento[] = [];
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(
    private colaboradoresService: ColaboradoresService,
    private empresasService: EmpresasService,
    private departamentosService: DepartamentosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadColaboradores();
    this.loadEmpresas();
    this.loadDepartamentos();
  }

  loadColaboradores(): void {
    this.colaboradoresService.getColaboradores().subscribe(
      data => this.colaboradores = data,
      error => {
        console.error('Error al cargar los colaboradores', error);
        this.mensajeError = 'Error al cargar los colaboradores';
      }
    );
  }

  loadEmpresas(): void {
    this.empresasService.getEmpresas().subscribe(
      data => this.empresas = data,
      error => {
        console.error('Error al cargar las empresas', error);
      }
    );
  }

  loadDepartamentos(): void {
    this.departamentosService.getDepartamentos().subscribe(
      data => this.departamentos = data,
      error => {
        console.error('Error al cargar los departamentos', error);
      }
    );
  }

  getEmpresaNombre(empresaId: number): string {
    const empresa = this.empresas.find(e => e.id === empresaId);
    return empresa ? empresa.nombre : 'Desconocido';
  }

  getDepartamentoNombre(departamentoId: number): string {
    const departamento = this.departamentos.find(d => d.id === departamentoId);
    return departamento ? departamento.nombre : 'Desconocido';
  }

  modificarColaborador(id: number): void {
    this.router.navigate(['/modificar-colaborador', id]);
  }

  eliminarColaborador(id: number): void {
    this.colaboradoresService.deleteColaborador(id).subscribe(
      () => {
        this.mensajeExito = 'Colaborador eliminado con éxito';
        this.loadColaboradores();
      },
      error => {
        console.error('Error al eliminar el colaborador', error);
        this.mensajeError = 'Hubo un error al eliminar el colaborador';
      }
    );
  }

  crearColaborador(): void {
    this.router.navigate(['/crear-colaborador']);
  }
}

