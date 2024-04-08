import {Component} from '@angular/core';
import {FormComponent} from "../../../shared/form/form.component";
import {AsyncPipe, CommonModule} from "@angular/common";
import {FormType} from "../../../shared/model/form-type";
import {CrudOperation} from "../../../shared/model/crud-operation";
import {CategoryService} from "../../../core/service/category.service";
import {Category} from "../../../shared/model/category";
import {Router} from "@angular/router";
import {catchError, of, tap} from "rxjs";

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    AsyncPipe
  ],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {
  FormType = FormType;
  protected readonly CrudOperation = CrudOperation;

  isError = false;
  message = '';

  constructor(private categoryService: CategoryService, private router: Router) {
  }

  onSubmit(category: Category) {
    this.categoryService.createCategory(category).pipe(
      tap(() => this.isError = false),
      tap(() => this.router.navigateByUrl('/categories')),
      catchError((error) => {
        this.isError = true;
        this.message = error instanceof ErrorEvent ? error.message : error;
        return of(error);
      })
    ).subscribe();
  }
}
