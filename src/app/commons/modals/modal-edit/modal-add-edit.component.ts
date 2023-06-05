import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FirebaseCrudService } from 'src/app/services/firebase.service';
import { I_ModalData, I_ModalItems } from './modal-add-edit.interface';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styleUrls: ['./modal-add-edit.component.scss'],
})
export class ModalAddEditComponent implements OnInit {
  public form: FormGroup;
  public disableButton: boolean;
  public registerData: I_ModalItems;
  public messageRequiredItem: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar,
    public firebaseCrudService: FirebaseCrudService,
    public dialogRef: MatDialogRef<ModalAddEditComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: I_ModalData,
  ) {
    this.form = this.createForm();
    this.messageRequiredItem = 'Campo obligatorio';
  }

  public ngOnInit(): void {
    if (this.data?.dataEdit) {
      this.setFormValues();
    }
  }

  public setFormValues(): void {
    const { title, description, status } = this.data?.dataEdit;
    this.form.setValue({ title, description, status });
  }

  public createForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  public get formError(): { [key: string]: any } {
    return this.form.controls;
  }

  public sendForm(): void {
    if (this.form.valid) {
      this.disableButton = true;
      this.registerData = { ...this.form.value };

      if (this.data.dataEdit) {
        this.updateTask();
      } else {
        this.addTask();
      }
    }
  }

  public updateTask(): void {
    const { id } = this.data?.dataEdit;
    this.firebaseCrudService
      .update(id, this.registerData)
      .then(() => {
        this.onCloseModal();
        this.openSnackBar();
        this.disableButton = false;
      })
      .catch((err) => console.error(err));
  }

  public addTask(): void {
    this.firebaseCrudService
      .create(this.registerData)
      .then(() => {
        this.onCloseModal();
        this.openSnackBar();
        this.disableButton = false;
      })
      .catch((err) => console.error(err));
  }

  public openSnackBar(): void {
    this.snackBar.open('¡Registro exitoso!', '', {
      duration: 1000,
    });
  }

  public onCloseModal(): void {
    this.dialogRef.close();
  }
}
