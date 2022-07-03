import { Component, Input, OnInit } from '@angular/core';
import { ControlBase } from '../../../interfaces/control-base';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {
  @Input() engraver!: any;
  @Input() meta!: ControlBase
  @Input() form!: FormGroup

  fontId: number = -1;

  constructor() { }

  ngOnInit(): void { }

  valueChange(newValue: string) {
    this.fontId = +this.meta.key.split("-")[1]
    this.engraver.setText(this.fontId, newValue)
  }
}
