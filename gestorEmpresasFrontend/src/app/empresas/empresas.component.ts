import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EmpresasService } from './empresas.service';
import { Empresa } from './empresa.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  empresas: Empresa[] = [];

  constructor(private empresasService: EmpresasService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmpresas();
  }

  loadEmpresas(): void {
    this.empresasService.getEmpresas().subscribe(empresas => {
      this.empresas = empresas;
    });
  }

  modificarEmpresa(id: number): void {
    this.router.navigate(['/modificar-empresa', id]);
  }

  eliminarEmpresa(id: number): void {
    this.empresasService.deleteEmpresa(id).subscribe(() => {
      console.log('Empresa eliminada con ID:', id);
      this.loadEmpresas();
    });
  }

  crearEmpresa(): void {
    this.router.navigate(['/crear-empresa']);
  }
}
