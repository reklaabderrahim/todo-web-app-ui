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
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    AsyncPipe
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit {
  public categories$: Observable<Category[]>;
  FormType = FormType;
  task: Task;
  protected readonly CrudOperation = CrudOperation;

  isError = false;
  message = '';

  constructor(private categoryService: CategoryService, private taskService: TaskService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.task = this.route.snapshot.data['task'];
  }

  onSubmit(task: Task) {
    task.id = this.task.id;
    task.deadline = new Date(task.deadline).toISOString().split('.')[0];
    this.taskService.updateTask(task).pipe(
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
