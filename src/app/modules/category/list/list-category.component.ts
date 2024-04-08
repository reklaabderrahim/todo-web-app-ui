import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../core/service/category.service";
import {catchError, Observable, of, tap} from "rxjs";
import {Category} from "../../../shared/model/category";
import {AsyncPipe, CommonModule, JsonPipe, NgFor} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    JsonPipe,
    NgFor,
    RouterLink
  ],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css'
})
export class ListCategoryComponent implements OnInit {

  public categories$: Observable<Category[]>;

  isVisible = false;
  message = '';

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

  delete(id: number) {
    this.categoryService.deleteCategory(id).pipe(
      tap(() => this.isVisible = false),
      catchError((error) => {
        this.isVisible = true;
        this.message = error;
        return of(error);
      }),
      tap(() => this.loadCategories()),
    ).subscribe();
  }
}
