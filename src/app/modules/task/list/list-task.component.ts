import {Component, OnInit} from '@angular/core';
import {Observable, tap} from "rxjs";
import {AsyncPipe, CommonModule, JsonPipe, NgFor} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TaskService} from "../../../core/service/task.service";
import {Task} from "../../../shared/model/task";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    JsonPipe,
    NgFor,
    RouterLink
  ],
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export class ListTaskComponent implements OnInit {

  public tasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks$ = this.taskService.getAllTasks();
  }

  delete(id: number) {
    this.taskService.deleteTask(id).pipe(
      tap(() => this.loadTasks())
    ).subscribe();
  }
}
