import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";

import { I_MenuItems } from "../../atoms/menu/menu.interface";

@Component({
  selector: "atom-checkbox-card",
  templateUrl: "./checkbox-card.component.html",
  styleUrls: ["./checkbox-card.component.scss"],
})
export class CheckboxCardComponent {
  public dataMenu: I_MenuItems[];

  @Input() public title: string;
  @Input() public subtitle: string;
  @Input() public checked: boolean;

  @Output() public itemSelected = new EventEmitter();
  @Output() public valueChanged = new EventEmitter();

  constructor() {
    this.dataMenu = [
      { id: "editTask", label: "Editar" },
      { id: "deleteTask", label: "Eliminar" },
    ];
  }

  getValueMenu(selectedId: string) {
    this.itemSelected.emit(selectedId);
  }

  onChange(target: MatCheckboxChange) {
    this.valueChanged.emit(target.checked);
  }
}
