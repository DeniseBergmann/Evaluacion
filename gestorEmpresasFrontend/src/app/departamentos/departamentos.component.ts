import { Component, OnInit } from '@angular/core';
import { DepartamentosService } from './deparamentos.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  departamentos: any[] = [];

  constructor(private departamentosService: DepartamentosService, private router: Router) {}

  ngOnInit(): void {
    this.departamentosService.getDepartamentos().subscribe((data) => {
      this.departamentos = data;
    });
  }

  modificarDepartamento(id: number): void {
    this.router.navigate(['/modificar-departamento', id]);
  }

  eliminarDepartamento(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este departamento?')) {
      this.departamentosService.deleteDepartamento(id).subscribe(() => {
        this.departamentos = this.departamentos.filter(dep => dep.id !== id);
        alert('Departamento eliminado con éxito');
      }, error => {
        console.error('Error al eliminar el departamento', error);
        alert('Ocurrió un error al eliminar el departamento');
      });
    }
  }

  crearDepartamento(): void {
    this.router.navigate(['/crear-departamento']);
  }
}
