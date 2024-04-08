import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from "../../../environments/environment";
import {Task} from "../../shared/model/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.baseApiUrl + environment.taskPath;

  constructor(private http: HttpClient) {
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      catchError(this.handleError)
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task).pipe(
      catchError(this.handleError)
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log('error: ', error)
    let message = error.error?.detail ? error.error.detail : error.error.message;
    if (message == null) {
      message = 'Generic Error';
    }
    return throwError(() => message);
  }
}
