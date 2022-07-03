import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlBase } from '../../interfaces/control-base'

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  @Input() control!: ControlBase;
  @Input() colorsName!: string[];
  @Input() engraver!: any;
  @Input() form!: FormGroup;

  constructor() { }

  ngOnInit(): void { }

}
