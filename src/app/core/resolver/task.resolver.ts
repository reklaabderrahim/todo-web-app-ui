import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {Task} from "../../shared/model/task";
import {TaskService} from "../service/task.service";
import {map} from "rxjs";

export const taskResolver: ResolveFn<Task> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const taskId = +route.params['id'];
  return inject(TaskService).getTaskById(taskId).pipe(
    map(task => {
      const deadline = new Date(task.deadline);
      task.deadline = deadline.toISOString().substring(0, 10);
      return task;
    })
  );
};
