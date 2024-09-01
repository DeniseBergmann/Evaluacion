import { Component, OnInit } from '@angular/core';
import { DepartamentosService } from '../departamentos/deparamentos.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Departamento } from '../departamentos/departamento.model';
import { Empresa } from '../empresas/empresa.model';
import { EmpresasService } from '../empresas/empresas.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-modificar-departamento',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './modificar-departamento.component.html',
  styleUrls: ['./modificar-departamento.component.css']
})
export class ModificarDepartamentoComponent implements OnInit {
  departamento: Departamento = new Departamento(0, '', '', '', 0, '', '', '', '');
  empresas: Empresa[] = [];
  empresaNombre: string = '';
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(
    private departamentosService: DepartamentosService,
    private empresasService: EmpresasService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.departamentosService.getDepartamento(id).subscribe(
      data => {
        this.departamento = data;
        this.obtenerNombreEmpresa(this.departamento.empresaId);
      },
      error => {
        console.error('Error al cargar el departamento', error);
        this.mensajeError = 'Error al cargar el departamento';
      }
    );

    this.empresasService.getEmpresas().subscribe(
      data => {
        this.empresas = data;
      },
      error => {
        console.error('Error al cargar las empresas', error);
      }
    );
  }

  obtenerNombreEmpresa(empresaId: number): void {
    const empresa = this.empresas.find(e => e.id === empresaId);
    this.empresaNombre = empresa ? empresa.nombre : 'Empresa no encontrada';
  }

  onSubmit(): void {
    if (this.departamento.id !== undefined) {
      this.departamentosService.updateDepartamento(this.departamento.id, this.departamento).subscribe(
        response => {
          this.mensajeExito = 'Departamento modificado con éxito';
          setTimeout(() => {
            this.router.navigate(['/departamentos']);
          }, 3000);
        },
        error => {
          console.error('Error al modificar el departamento', error);
          this.mensajeError = 'Hubo un error al modificar el departamento';
        }
      );
    } else {
      this.mensajeError = 'ID del departamento no válido';
    }
  }

  cancelar(): void {
    this.router.navigate(['/departamentos']);
  }
}
