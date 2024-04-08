import {Component, OnInit} from '@angular/core';
import {FormComponent} from "../../../shared/form/form.component";
import {AsyncPipe, CommonModule} from "@angular/common";
import {FormType} from "../../../shared/model/form-type";
import {CrudOperation} from "../../../shared/model/crud-operation";
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../../../shared/model/category";
import {CategoryService} from "../../../core/service/category.service";
import {catchError, of, tap} from "rxjs";

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    AsyncPipe
  ],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit {
  category: Category;
  FormType = FormType;
  protected readonly CrudOperation = CrudOperation;

  isError = false;
  message = '';

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router) {
  }

  ngOnInit(): void {
    this.category = this.route.snapshot.data['category'];
  }

  onSubmit(category: Category) {
    category.id = this.category.id;
    this.categoryService.updateCategory(category).pipe(
      tap(() => this.isError = false),
      tap(() => this.router.navigateByUrl('/categories')),
      catchError((error) => {
        this.isError = true;
        this.message = error;
        return of(error);
      })
    ).subscribe();
  }
}
