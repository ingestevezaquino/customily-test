import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';
import { ControlBase } from '../../interfaces/control-base';

declare let engraver: any; //declare engraver

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  colorsName: string[] = []
  engraver: any = engraver
  form: FormGroup = this.fb.group({ text1: [''] });
  formData: ControlBase[] = []
  templateGUID: string | null = this.route.snapshot.paramMap.get('templateGuid');

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private cs: ColorService) { }

  ngOnInit(): void {
    this.engraver.init('preview-canvas')
    this.engraver.setProduct(this.templateGUID).then(() => {
      this.collectDataFromEngraver(this.engraver.currentProduct)
      this.form = this.createFormGroup(this.formData)
    });
  }

  collectDataFromEngraver(data: any): ControlBase[] {

    // ==================================================================================== 
    // add textbox

    for (let i = 0; i < data.preview.textsPreview.length; i++) {
      this.formData.push({
        key: '',
        order: this.formData.length == 0 ? 0 : this.formData.length,
        controlType: 'label',
        text: 'Text ' + (i + 1)
      })

      this.formData.push({
        key: 'text-' + data.preview.textsPreview[i].id,
        order: this.formData.length,
        controlType: 'textinput'
      })

      // ==================================================================================== 
      // change font

      let fontsMap = JSON.parse(data.preview.textsPreview[i].fontsMap)

      if (fontsMap.length > 0) {
        this.formData.push({
          key: '',
          order: this.formData.length == 0 ? 0 : this.formData.length,
          controlType: 'label',
          text: 'Text ' + (i + 1) + '\'s font'
        })

        let textFonts: ControlBase = {
          key: 'text-' + data.preview.textsPreview[i].id + '-font',
          order: this.formData.length,
          controlType: 'dropdown',
          options: fontsMap?.map((_: any, i: number) => {
            let fontName: string = fontsMap[i][1].split("/")[4]
            fontName = fontName.split('-')[0]
            return { key: fontsMap[i][0], value: fontName }
          })
        }

        this.formData.push(textFonts)
      }

      // ==================================================================================== 
      // change font's color

      let fontColorsMap = JSON.parse(data.preview.textsPreview[i].fontColorsMap)

      if (fontColorsMap.length > 1) {
        this.formData.push({
          key: '',
          order: this.formData.length == 0 ? 0 : this.formData.length,
          controlType: 'label',
          text: 'Text ' + (i + 1) + '\'s font color'
        })

        let textFontColors: ControlBase = {
          key: 'text-' + data.preview.textsPreview[i].id + '-font-color',
          order: this.formData.length,
          controlType: 'dropdown',
          options: fontColorsMap?.map((_: any, i: number) => {
            this.setColorsName(fontColorsMap[i][1].hex.replace('#', ''))
            return { key: fontColorsMap[i][0], value: fontColorsMap[i][1].hex }
          })
        }

        this.formData.push(textFontColors)
      }
    }

    // ==================================================================================== 
    // select / upload image

    console.log(this.engraver.currentProduct)

    for (let i = 0; i < data.preview.imagePlaceHoldersPreview.length; i++) {

      if (data.preview.imagePlaceHoldersPreview[i].dynamicImagesPath === null) {
        this.formData.push({
          key: '',
          order: this.formData.length == 0 ? 0 : this.formData.length,
          controlType: 'label',
          text: 'Image ' + (i + 1)
        })

        this.formData.push({
          key: 'image-' + data.preview.imagePlaceHoldersPreview[i].id,
          order: this.formData.length,
          controlType: 'imageinput'
        })
      }
      else if (data.preview.imagePlaceHoldersPreview[i].dynamicImagesPath.size > 0) {
        this.formData.push({
          key: '',
          order: this.formData.length == 0 ? 0 : this.formData.length,
          controlType: 'label',
          text: 'Dynamic Image ' + (i + 1)
        })

        let dynamicImages: ControlBase = {
          key: 'dynamic-image-' + data.preview.imagePlaceHoldersPreview[i].id,
          order: this.formData.length,
          controlType: 'dropdown',
          options: []
        }

        let imageOptionMap = new Map([...(data.preview.imagePlaceHoldersPreview[i].dynamicImagesPath)].sort((a, b) => a[0] - b[0]));
        imageOptionMap.forEach((_: any, i: any) => {
          dynamicImages.options?.push({ key: `${i}`, value: `${i}` })
        })

        this.formData.push(dynamicImages)
      }

    }

    // ==================================================================================== 
    // return created components

    return this.formData;
  }

  createFormGroup(controls: ControlBase[]) {
    const group: any = {}

    controls.forEach((control) => {
      if (control.controlType !== 'label') {
        group[control.key] = control.required
          ? new FormControl('', Validators.required)
          : new FormControl('');
      }
    })
    return new FormGroup(group)
  }

  setColorsName(hex: string) {
    this.cs.getColorName(hex).subscribe({
      next: (color: any) => {
        this.colorsName.push(color.name.value)
      },
      error: (error: any) => { console.log(error) },
      complete: () => { }
    })
  }
}
