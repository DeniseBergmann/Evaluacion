import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { CrearEmpresaComponent } from './crear-empresa/crear-empresa.component';
import { ModificarEmpresaComponent } from './modificar-empresa/modificar-empresa.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { CrearDepartamentoComponent } from './crear-departamento/crear-departamento.component';
import { ModificarDepartamentoComponent } from './modificar-departamento/modificar-departamento.component';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';
import { CrearColaboradorComponent } from './crear-colaborador/crear-colaborador.component';
import { ModificarColaboradorComponent } from './modificar-colaborador/modificar-colaborador.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'empresas', component: EmpresasComponent },
  { path: 'crear-empresa', component: CrearEmpresaComponent },
  { path: 'modificar-empresa/:id', component: ModificarEmpresaComponent },
  { path: 'departamentos', component: DepartamentosComponent },
  { path: 'crear-departamento', component: CrearDepartamentoComponent },
  { path: 'modificar-departamento/:id', component: ModificarDepartamentoComponent },
  { path: 'colaboradores', component: ColaboradoresComponent },
  { path: 'crear-colaborador', component: CrearColaboradorComponent },
  { path: 'modificar-colaborador/:id', component: ModificarColaboradorComponent },
  { path: '**', redirectTo: '' }
];


