import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ColaboradoresService } from '../colaboradores/colaboradores.service';
import { Colaborador } from '../colaboradores/colaborador.model';
import { Empresa } from '../empresas/empresa.model';
import { Departamento } from '../departamentos/departamento.model';
import { EmpresasService } from '../empresas/empresas.service';
import { DepartamentosService } from '../departamentos/deparamentos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-crear-colaborador',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './crear-colaborador.component.html',
  styleUrls: ['./crear-colaborador.component.css']
})
export class CrearColaboradorComponent implements OnInit {
  colaborador: Colaborador = new Colaborador(0, '', '', '', 0, '', '', '', '', '', '', '', '', '');

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
    this.empresasService.getEmpresas().subscribe(
      data => {
        this.empresas = data;
      },
      error => {
        console.error('Error al cargar las empresas', error);
      }
    );

    this.departamentosService.getDepartamentos().subscribe(
      data => {
        this.departamentos = data;
      },
      error => {
        console.error('Error al cargar los departamentos', error);
      }
    );
  }

  onSubmit(): void {
    this.colaboradoresService.createColaborador(this.colaborador).subscribe(
      response => {
        this.mensajeExito = 'Colaborador creado con éxito';
        setTimeout(() => {
          this.router.navigate(['/colaboradores']);
        }, 3000);
      },
      error => {
        console.error('Error al crear el colaborador', error);
        this.mensajeError = 'Hubo un error al crear el colaborador';
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['/colaboradores']);
  }
}
