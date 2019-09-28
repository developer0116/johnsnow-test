import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert.service';
import { ScrollableDirective } from './directives/scrollable.directive';
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LazyLoadImageModule
  ],
  declarations: [
    AlertComponent,
    ScrollableDirective,
    LazyImageComponent
  ],
  providers: [
    AlertService
  ],
  entryComponents: [],
  exports: [
    AlertComponent,
    ScrollableDirective,
    LazyImageComponent
  ]
})
export class SharedModule { }
