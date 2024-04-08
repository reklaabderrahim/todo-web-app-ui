import {Route} from '@angular/router';
import {ListCategoryComponent} from "./list/list-category.component";
import {CreateCategoryComponent} from "./create/create-category.component";
import {EditCategoryComponent} from "./edit/edit-category.component";
import {DetailCategoryComponent} from "./detail/detail-category.component";
import {categoryResolver} from "../../core/resolver/category.resolver";


export const CATEGORY_ROUTES: Route[] = [
  {
    path: '',
    component: ListCategoryComponent
  },
  {
    path: 'create',
    component: CreateCategoryComponent
  },
  {
    path: 'edit/:id',
    component: EditCategoryComponent,
    resolve: {category: categoryResolver},
  },
  {
    path: 'detail/:id',
    component: DetailCategoryComponent,
    resolve: {category: categoryResolver},
  },
];
