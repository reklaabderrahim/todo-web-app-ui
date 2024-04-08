import {Route} from '@angular/router';
import {ListTaskComponent} from "./list/list-task.component";
import {CreateTaskComponent} from "./create/create-task.component";
import {EditTaskComponent} from "./edit/edit-task.component";
import {DetailTaskComponent} from "./detail/detail-task.component";


export const TASK_ROUTES: Route[] = [
  {
    path: '',
    component: ListTaskComponent
  },
  {
    path: 'create',
    component: CreateTaskComponent
  },
  {
    path: 'edit',
    component: EditTaskComponent
  },
  {
    path: 'detail',
    component: DetailTaskComponent
  },
];
