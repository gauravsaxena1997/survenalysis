import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SurveyLayoutComponent } from './survey-layout/survey-layout.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { QuestionListComponent } from './question-list/question-list.component';


@NgModule({
  declarations: [
    SurveyLayoutComponent,
    CreateQuestionComponent,
    QuestionListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SurveyScriptingModule { }
