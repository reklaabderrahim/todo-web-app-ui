import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormComponent} from "../../../shared/form/form.component";
import {CategoryService} from "../../../core/service/category.service";
import {Observable} from "rxjs";
import {Category} from "../../../shared/model/category";
import {AsyncPipe, CommonModule} from "@angular/common";
import {FormType} from "../../../shared/model/form-type";
import {CrudOperation} from "../../../shared/model/crud-operation";

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    AsyncPipe
  ],
  templateUrl: './detail-task.component.html',
  styleUrl: './detail-task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailTaskComponent implements OnInit{

  public categories$: Observable<Category[]>;
  FormType = FormType;
  constructor(private categoryService: CategoryService) {
  }

  onSubmit(formData: any) {
    // Handle form submission here
    console.log(formData);
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

  protected readonly CrudOperation = CrudOperation;
}
