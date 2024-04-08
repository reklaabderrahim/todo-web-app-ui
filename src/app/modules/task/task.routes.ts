import {Route} from '@angular/router';
import {ListTaskComponent} from "./list/list-task.component";
import {CreateTaskComponent} from "./create/create-task.component";
import {EditTaskComponent} from "./edit/edit-task.component";
import {DetailTaskComponent} from "./detail/detail-task.component";
import {taskResolver} from "../../core/resolver/task.resolver";


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
    path: 'edit/:id',
    component: EditTaskComponent,
    resolve: {task: taskResolver},
  },
  {
    path: 'detail/:id',
    component: DetailTaskComponent,
    resolve: {task: taskResolver},
  },
];
