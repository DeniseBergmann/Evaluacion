import { Component, OnInit } from '@angular/core';
import { DepartamentosService } from '../departamentos/deparamentos.service';
import { Router } from '@angular/router';
import { Departamento } from '../departamentos/departamento.model';
import { Empresa } from '../empresas/empresa.model';
import { EmpresasService } from '../empresas/empresas.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-crear-departamento',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './crear-departamento.component.html',
  styleUrls: ['./crear-departamento.component.css']
})
export class CrearDepartamentoComponent implements OnInit {
  departamento: Departamento = new Departamento(0, '', '', '', 0, '', '', '', '');
  empresas: Empresa[] = [];
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(
    private departamentosService: DepartamentosService,
    private empresasService: EmpresasService,
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
  }

  onSubmit(): void {
    this.departamentosService.createDepartamento(this.departamento).subscribe(
      response => {
        this.mensajeExito = 'Departamento creado con éxito';
        setTimeout(() => {
          this.router.navigate(['/departamentos']);
        }, 3000);
      },
      error => {
        console.error('Error al crear el departamento', error);
        this.mensajeError = 'Hubo un error al crear el departamento';
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['/departamentos']);
  }
}
