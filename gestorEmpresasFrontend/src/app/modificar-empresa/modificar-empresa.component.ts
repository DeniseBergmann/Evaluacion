import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmpresasService } from '../empresas/empresas.service';
import { Empresa } from '../empresas/empresa.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-modificar-empresa',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './modificar-empresa.component.html',
  styleUrls: ['./modificar-empresa.component.css']
})
export class ModificarEmpresaComponent implements OnInit {
  empresa: Empresa = new Empresa(0, '', '', '', '', '', '', '', '');
  empresaId: number | null = null;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(
    private empresaService: EmpresasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.empresaId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.empresaId) {
      this.empresaService.getEmpresa(this.empresaId).subscribe(
        (empresa) => this.empresa = empresa,
        (error) => {
          this.mensajeError = 'Error al cargar la empresa';
          console.error('Error al cargar la empresa', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.empresaId) {
      this.empresaService.updateEmpresa(this.empresaId, this.empresa).subscribe(
        () => {
          this.mensajeExito = 'Empresa guardada con éxito';
          this.mensajeError = null;

          setTimeout(() => {
            this.router.navigate(['/empresas']);
          }, 3000);
        },
        (error) => {
          this.mensajeError = 'Hubo un error al guardar la empresa';
          this.mensajeExito = null;
          console.error('Error al actualizar la empresa', error);
        }
      );
    }
  }

  cancelar(): void {
    this.router.navigate(['/empresas']);
  }
}
