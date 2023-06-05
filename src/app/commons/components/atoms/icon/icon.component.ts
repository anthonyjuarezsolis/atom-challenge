import { Component, Input, OnInit } from "@angular/core";
import { I_IconMode, I_IconType } from "./icon.interface";

@Component({
  selector: "atom-icon",
  templateUrl: "./icon.component.html",
  styleUrls: ["./icon.component.scss"],
})
export class IconComponent implements OnInit {
  @Input() name: string = "face";
  @Input() size: string = "24";
  @Input() color: string = "dark";
  @Input() type: I_IconType = "outlined";
  @Input() mode: I_IconMode = "default";

  public classes!: Array<string>;

  ngOnInit() {
    this.classes = [
      "atom-icon-material",
      "atom-icon-material--" + this.type,
      "atom-icon-material__mode-" + this.mode,
    ];
  }
}
