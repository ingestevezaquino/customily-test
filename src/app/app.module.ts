import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';

import { TextInputComponent } from './components/controls/text-input/text-input.component'
import { DropdownComponent } from './components/controls/dropdown/dropdown.component';
import { LabelComponent } from './components/controls/label/label.component';
import { ControlComponent } from './components/control/control.component';
import { ImageInputComponent } from './components/controls/image-input/image-input.component';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    TextInputComponent,
    DropdownComponent,
    LabelComponent,
    ControlComponent,
    ImageInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
