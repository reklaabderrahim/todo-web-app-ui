import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {Category} from "../../shared/model/category";
import {CategoryService} from "../service/category.service";

export const categoryResolver: ResolveFn<Category> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const taskId = +route.params['id'];
  return inject(CategoryService).getCategoryById(taskId);
};
