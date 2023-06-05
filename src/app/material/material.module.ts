import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRadioModule } from "@angular/material/radio";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { OverlayModule } from "@angular/cdk/overlay";
import { MatTableModule } from "@angular/material/table";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { MatMenuModule } from "@angular/material/menu";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";

const MaterialComponentsModules = [
  MatCheckboxModule,
  MatTooltipModule,
  MatRadioModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatTabsModule,
  MatProgressBarModule,
  OverlayModule,
  MatTableModule,
  ClipboardModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCardModule,
  MatDividerModule,
  // More
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MaterialComponentsModules],
  exports: [...MaterialComponentsModules],
})
export class MaterialModule {}
