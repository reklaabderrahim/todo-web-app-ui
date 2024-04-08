import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./modules/task/task.routes').then(m => m.TASK_ROUTES),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./modules/category/category.routes').then(m => m.CATEGORY_ROUTES),
  },
];
