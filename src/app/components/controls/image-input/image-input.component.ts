import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { ControlBase } from '../../../interfaces/control-base';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css']
})
export class ImageInputComponent implements OnInit {
  @Input() engraver!: any;
  @Input() meta!: ControlBase
  @Input() form!: FormGroup;

  constructor() { }

  ngOnInit(): void { }

  setImage(imageUrl: string) {
    let files = (<HTMLInputElement>document.getElementById(this.meta.key)).files

    if (files === null || !(files?.length > 0)) {
      console.log(files)
      return;
    }

    if (!(files[0].type.includes('image'))) {
      return;
    }

    let photo = (<HTMLInputElement>document.getElementById(this.meta.key)).files![0]

    let placeholderId = +(this.meta.key.split('-')[1]);
    let engraver = this.engraver;
    let reader = new FileReader();

    reader.addEventListener("load", () => {
      engraver.setImage(placeholderId, reader.result);
    }, false);

    reader.readAsDataURL(photo);
  }
}
