import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormComponent} from "../../../shared/form/form.component";
import {AsyncPipe, CommonModule} from "@angular/common";
import {FormType} from "../../../shared/model/form-type";
import {CrudOperation} from "../../../shared/model/crud-operation";

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    AsyncPipe
  ],
  templateUrl: './detail-category.component.html',
  styleUrl: './detail-category.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailCategoryComponent {
  FormType = FormType;

  onSubmit(formData: any) {
    // Handle form submission here
    console.log(formData);
  }

  protected readonly CrudOperation = CrudOperation;
}
