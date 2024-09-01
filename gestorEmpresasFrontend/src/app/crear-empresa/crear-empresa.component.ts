import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EmpresasService } from '../empresas/empresas.service';
import { Empresa } from '../empresas/empresa.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-crear-empresa',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.css']
})
export class CrearEmpresaComponent {
  empresa: Empresa = new Empresa(0, '', '', '', '', '', '', '', '');
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(private empresaService: EmpresasService, private router: Router) {}

  onSubmit(): void {
    this.empresaService.createEmpresa(this.empresa).subscribe(
      response => {
        this.mensajeExito = 'La empresa se ha creado con éxito.';
        this.mensajeError = null;
        setTimeout(() => {
          this.router.navigate(['/empresas']);
        }, 3000);
      },
      error => {
        this.mensajeError = 'Hubo un error al crear la empresa. Por favor, inténtelo de nuevo.';
        this.mensajeExito = null;
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['/empresas']);
  }
}
