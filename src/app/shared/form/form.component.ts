import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgFor} from "@angular/common";
import {Category} from "../model/category";
import {FormType} from "../model/form-type";
import {CrudOperation} from "../model/crud-operation";
import {Task} from "../model/task";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, NgFor, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  form: FormGroup;
  @Input() category: Category;
  @Input() task: Task;
  @Output() formSubmit = new EventEmitter<any>();
  @Input() categories: Category[];
  @Input() type: FormType;
  FormType = FormType;
  @Input() operation: CrudOperation;
  CrudOperation = CrudOperation;

  // Toaster
  @Input() isVisible: boolean = false;
  @Input() message: string = 'error';

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl({value: this.task ? this.task.name : this.category?.name, disabled: this.isReadOperation()}, Validators.required),
      description: new FormControl({value: this.task ? this.task.description : this.category?.description, disabled: this.isReadOperation()})
    });
    if (this.operation !== CrudOperation.create) {
        this.form.addControl('id', new FormControl({value: this.task ? this.task.id : this.category?.id, disabled: true}, Validators.required));
    }
    if (this.type === FormType.task) {
      this.form.addControl('deadline', new FormControl({value: this.task?.deadline, disabled: this.isReadOperation()}, Validators.required));
      this.form.addControl('category', new FormControl({value: this.task?.category, disabled: this.isReadOperation()}, Validators.required));
    }
  }

  submitForm() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
      this.form.reset();
    }
  }

  trackByName(index: number, category: Category): string {
    return category.name;
  }

  private isReadOperation(): boolean {
    return this.operation === CrudOperation.read;
  }
}
