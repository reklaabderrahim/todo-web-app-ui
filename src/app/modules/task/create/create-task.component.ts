import {Component, OnInit} from '@angular/core';
import {FormComponent} from "../../../shared/form/form.component";
import {CategoryService} from "../../../core/service/category.service";
import {catchError, Observable, of, tap} from "rxjs";
import {Category} from "../../../shared/model/category";
import {AsyncPipe, CommonModule} from "@angular/common";
import {FormType} from "../../../shared/model/form-type";
import {CrudOperation} from "../../../shared/model/crud-operation";
import {Task} from "../../../shared/model/task";
import {TaskService} from "../../../core/service/task.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    AsyncPipe
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit {

  public categories$: Observable<Category[]>;
  FormType = FormType;
  CrudOperation = CrudOperation;

  isError = false;
  message = '';

  constructor(private categoryService: CategoryService, private taskService: TaskService, private router: Router) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

  onSubmit(task: Task) {
    task.deadline = new Date(task.deadline).toISOString().split('.')[0];
    this.taskService.createTask(task).pipe(
      tap(() => this.isError = false),
      tap(() => this.router.navigateByUrl('/tasks')),
      catchError((error) => {
        this.isError = true;
        this.message = error;
        return of(error);
      })
    ).subscribe();
  }
}
