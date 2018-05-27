import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListComponentComponent } from './shared-components/list-component/list-component.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListComponentComponent],
  exports: [ListComponentComponent]
})
export class SharedComponentsModule { }
