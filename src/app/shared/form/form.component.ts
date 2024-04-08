import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgFor} from "@angular/common";
import {Category} from "../model/category";
import {FormType} from "../model/form-type";
import {CrudOperation} from "../model/crud-operation";

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
  @Output() formSubmit = new EventEmitter<any>();
  @Input() categories: Category[];
  @Input() type: FormType;
  FormType = FormType;
  @Input() operation: CrudOperation;
  CrudOperation = CrudOperation;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl({value: '', disabled: this.isReadOperation()}, Validators.required),
      description: new FormControl({value: '', disabled: this.isReadOperation()}, Validators.required)
    });
    if (this.operation !== CrudOperation.create) {
        this.form.addControl('id', new FormControl({value: null, disabled: true}, Validators.required));
    }
    if (this.type === FormType.task) {
      this.form.addControl('deadline', new FormControl({value: '', disabled: this.isReadOperation()}, Validators.required));
      this.form.addControl('category', new FormControl({value: '', disabled: this.isReadOperation()}, Validators.required));
    }
  }

  submitForm() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
      this.form.reset();
    }
  }

  private isReadOperation(): boolean {
    return this.operation === CrudOperation.read;
  }
}
