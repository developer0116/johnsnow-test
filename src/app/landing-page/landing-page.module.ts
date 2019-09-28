import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LandingPageComponent, ArticleListComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    SharedModule,
  ]
})
export class LandingPageModule { }
