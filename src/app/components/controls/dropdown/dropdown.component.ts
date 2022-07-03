import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { DropDownControl } from './dropdown-control'

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() colorsName!: string[];
  @Input() engraver!: any;
  @Input() meta!: DropDownControl;
  @Input() form!: FormGroup;

  @ViewChild('dropdown') dropdown!: ElementRef

  placeholderId: number = -1;
  textId: number = -1;
  fontId: number = -1;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.dropdown.nativeElement.options.selectedIndex = 0;
  }

  changeState(newValue: string) {
    if (this.meta.key.includes('dynamic-image')) {
      this.placeholderId = +this.meta.key.split("-")[2];
      this.engraver.setPresetImage(this.placeholderId, +newValue);
    }
    else if (this.meta.key.includes('color')) {
      this.textId = +this.meta.key.split("-")[1];
      this.fontId = +newValue;
      this.engraver.setFontColor(this.textId, this.fontId);
    }
    else {
      this.textId = +this.meta.key.split("-")[1];
      this.fontId = +newValue;
      this.engraver.setFont(this.textId, this.fontId);
    }
  }
}
