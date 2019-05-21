import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../../angular-material.module';
import { GeneratorTextComponent } from './web-modal/generator-text.component';
import { WebModalComponent } from './web-modal/web-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule
  ],
  declarations: [
    GeneratorTextComponent,
    WebModalComponent,
    LoaderComponent
  ],
  exports: [
    GeneratorTextComponent,
    WebModalComponent,
    LoaderComponent
  ],
  entryComponents: [
    GeneratorTextComponent,
    WebModalComponent,
    LoaderComponent
  ]
})
export class RenderModalsModule { }
