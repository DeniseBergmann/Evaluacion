import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  selector: 'app-modificar-colaborador',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './modificar-colaborador.component.html',
  styleUrls: ['./modificar-colaborador.component.css']
})
export class ModificarColaboradorComponent implements OnInit {
  colaborador: Colaborador = new Colaborador(0, '', '', '', 0, '', '', '', '', '', '', '', '', '');
  empresas: Empresa[] = [];
  departamentos: Departamento[] = [];
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(
    private colaboradoresService: ColaboradoresService,
    private empresasService: EmpresasService,
    private departamentosService: DepartamentosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.colaboradoresService.getColaborador(id).subscribe(
      data => {
        this.colaborador = {
          ...data,
          empresaNombre: data.empresaNombre.toString(),
          departamentoNombre: data.departamentoNombre.toString()
        };
      },
      error => {
        console.error('Error al cargar el colaborador', error);
        this.mensajeError = 'Error al cargar el colaborador';
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
    if (this.colaborador.id !== undefined) {
      this.colaboradoresService.updateColaborador(this.colaborador.id, this.colaborador).subscribe(
        response => {
          this.mensajeExito = 'Colaborador modificado con éxito';
          setTimeout(() => {
            this.router.navigate(['/colaboradores']);
          }, 3000);
        },
        error => {
          console.error('Error al modificar el colaborador', error);
          this.mensajeError = 'Hubo un error al modificar el colaborador';
        }
      );
    } else {
      this.mensajeError = 'ID del colaborador no válido';
    }
  }

  cancelar(): void {
    this.router.navigate(['/colaboradores']);
  }
}
