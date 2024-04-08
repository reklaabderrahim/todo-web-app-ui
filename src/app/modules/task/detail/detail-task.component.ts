import {Component, OnInit} from '@angular/core';
import {FormComponent} from "../../../shared/form/form.component";
import {Category} from "../../../shared/model/category";
import {AsyncPipe, CommonModule} from "@angular/common";
import {FormType} from "../../../shared/model/form-type";
import {CrudOperation} from "../../../shared/model/crud-operation";
import {ActivatedRoute} from "@angular/router";
import {Task} from "../../../shared/model/task";

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    AsyncPipe
  ],
  templateUrl: './detail-task.component.html',
  styleUrl: './detail-task.component.css'
})
export class DetailTaskComponent implements OnInit {
  public categories: Category[] = [];
  FormType = FormType;
  task: Task;
  protected readonly CrudOperation = CrudOperation;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.task = this.route.snapshot.data['task'];
    this.categories.push(this.task.category);
  }
}
