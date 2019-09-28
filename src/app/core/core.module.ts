import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from './guards/auth-guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    AuthGuard
  ],
  exports: []
})
export class CoreModule { }
