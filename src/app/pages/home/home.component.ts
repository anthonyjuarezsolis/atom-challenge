import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { FirebaseCrudService } from 'src/app/services/firebase.service';
import { ModalAddEditComponent } from 'src/app/commons/modals/modal-edit/modal-add-edit.component';
import { I_ModalItems } from 'src/app/commons/modals/modal-edit/modal-add-edit.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public messageRequiredItem: string;
  public completedTasks: Array<I_ModalItems>;
  public pendingTasks: Array<I_ModalItems>;
  public firebaseListInfo: Array<I_ModalItems>;

  public disableButton: boolean;
  public loading: boolean;

  constructor(
    private readonly snackBar: MatSnackBar,
    public dialog: MatDialog,
    public firebaseCrudService: FirebaseCrudService,
  ) {
    this.retrieveList();
    this.loading = true;
    this.pendingTasks = [];
    this.completedTasks = [];
    this.firebaseListInfo = [];
    this.disableButton = false;
    this.messageRequiredItem = 'Campo obligatorio';
  }

  public retrieveList(): void {
    this.firebaseCrudService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...(c.payload.doc.data() as I_ModalItems),
          })),
        ),
      )
      .subscribe((data: Array<I_ModalItems>) => {
        console.log(data);
        this.firebaseListInfo = data;
        this.completedTasks = data.filter((item) => item.status === 'complete');
        this.pendingTasks = data.filter((item) => item.status === 'pending');
        this.loading = false;
      });
  }

  public trackById(index: number, item: I_ModalItems): string {
    return item.id;
  }

  public onModalAdd() {
    this.dialog.open(ModalAddEditComponent, {
      width: '489px',
      panelClass: 'custom-container-no-padding',
      data: {
        title: 'Agregar tarea',
        textButton: 'Agregar',
      },
      autoFocus: false,
    });
  }

  public onModalEdit(dataEdit: I_ModalItems) {
    this.dialog.open(ModalAddEditComponent, {
      width: '489px',
      panelClass: 'custom-container-no-padding',
      data: {
        title: 'Editar tarea',
        dataEdit,
        textButton: 'Actualizar',
      },
      autoFocus: false,
    });
  }

  public onDelete(id: string) {
    this.firebaseCrudService.delete(id);
  }

  public menuSelected(selected: string, item: I_ModalItems) {
    if (selected === 'deleteTask') {
      this.onDelete(item.id);
    } else {
      this.onModalEdit(item);
    }
  }

  public updateStatus(checked: boolean, item: I_ModalItems) {
    item.status = checked ? 'complete' : 'pending';

    this.firebaseCrudService
      .update(item.id, item)
      .then(() => {
        this.openSnackBar();
      })
      .catch((err) => console.log(err));
  }

  public openSnackBar(): void {
    this.snackBar.open('¡Tarea actualizada!', '', {
      duration: 500,
    });
  }
}
