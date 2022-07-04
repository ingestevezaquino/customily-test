import { Component, Input, OnInit } from '@angular/core';
import { LabelControl } from './label-control';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {

  @Input() meta!: LabelControl
  constructor() { }

  ngOnInit(): void {
  }

}
