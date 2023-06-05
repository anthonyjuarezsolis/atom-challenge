import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { I_MenuItems, I_MenuPosition } from "./menu.interface";

@Component({
  selector: "atom-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  @Input() items: I_MenuItems[];
  @Input() position: I_MenuPosition;

  @Output() itemSelected = new EventEmitter();

  public showMenu: boolean;
  public classes!: Array<string>;

  constructor(private elementRef: ElementRef) {
    this.showMenu = false;
    this.position = "right";
  }

  ngOnInit() {
    this.classes = [`menu__container--${this.position}`];
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  onClick(id: string | number) {
    this.itemSelected.emit(id);
  }

  @HostListener("document:mousedown", ["$event"])
  onGlobalClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // closes dropdown if clicked outside
      this.showMenu = false;
    }
  }
}
