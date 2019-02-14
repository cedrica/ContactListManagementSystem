import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common'; // required any time you make a module apart of main module
import {FormsModule} from '@angular/forms';
import { TooltipComponent } from './tooltip.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    TooltipComponent
  ],
  exports: [
    CommonModule,
    FormsModule
  ]
})

export class TooltipModule {

}
