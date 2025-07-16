import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pagina/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    canActivate: [AuthGuard], // Protege todas las rutas hijas
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./pagina/inicio/inicio.module').then(m => m.InicioPageModule)
      },
  {
    path: 'perfil',
    loadChildren: () => import('./pagina/perfil/perfil.module').then(m => m.PerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'alert',
    loadChildren: () => import('./pagina/alert/alert.module').then(m => m.AlertPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'card',
    loadChildren: () => import('./pagina/card/card.module').then(m => m.CardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'checkbox',
    loadChildren: () => import('./pagina/checkbox/checkbox.module').then(m => m.CheckboxPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'chip',
    loadChildren: () => import('./pagina/chip/chip.module').then(m => m.ChipPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'fab',
    loadChildren: () => import('./pagina/fab/fab.module').then(m => m.FabPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'datetime',
    loadChildren: () => import('./pagina/datetime/datetime.module').then(m => m.DatetimePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'grid',
    loadChildren: () => import('./pagina/grid/grid.module').then(m => m.GridPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'infinite',
    loadChildren: () => import('./pagina/infinite/infinite.module').then(m => m.InfinitePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'inputs',
    loadChildren: () => import('./pagina/inputs/inputs.module').then(m => m.InputsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'modal',
    loadChildren: () => import('./pagina/modal/modal.module').then(m => m.ModalPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'popover',
    loadChildren: () => import('./pagina/popover/popover.module').then(m => m.PopoverPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: () => import('./pagina/list/list.module').then(m => m.ListPageModule),
    canActivate: [AuthGuard]
  }
  ]
  },
  {
    path: '**', // Ruta comodín para cualquier ruta no definida
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}