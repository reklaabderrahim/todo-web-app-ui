import {Component, OnInit} from '@angular/core';
import {FormComponent} from "../../../shared/form/form.component";
import {AsyncPipe, CommonModule} from "@angular/common";
import {FormType} from "../../../shared/model/form-type";
import {CrudOperation} from "../../../shared/model/crud-operation";
import {Category} from "../../../shared/model/category";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    AsyncPipe
  ],
  templateUrl: './detail-category.component.html',
  styleUrl: './detail-category.component.css'
})
export class DetailCategoryComponent implements OnInit {
  category: Category;
  FormType = FormType;
  protected readonly CrudOperation = CrudOperation;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.category = this.route.snapshot.data['category'];
  }
}
