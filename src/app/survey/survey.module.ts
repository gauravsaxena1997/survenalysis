import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material.module';
import { SurveyRoutingModule } from './survey-routing.module';

import { SurveyComponent } from './survey.component';
import { SinglePunchComponent } from './single-punch/single-punch.component';
import { MultiPunchComponent } from './multi-punch/multi-punch.component';
import { OpenTextComponent } from './open-text/open-text.component';

@NgModule({
  declarations: [
    SurveyComponent,
    SinglePunchComponent,
    MultiPunchComponent,
    OpenTextComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SurveyRoutingModule
  ]
})
export class SurveyModule { }
