import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

import { SurveyService } from './../../services/survey.service';

import Survey from '../../interfaces/survey';
import Question from '../../interfaces/question';
import { CreateQuestionComponent } from '../create-question/create-question.component';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-survey-layout',
  templateUrl: './survey-layout.component.html',
  styleUrls: ['./survey-layout.component.scss']
})
export class SurveyLayoutComponent implements OnInit {
  public survey: Survey;
  public questionForEdit: Question;
  public surveyName: FormControl = new FormControl('');

  @ViewChild(CreateQuestionComponent) createQuesComp!: CreateQuestionComponent;

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private clipboard: Clipboard
  ) { }

  ngOnInit(): void {
    const surveyId: string|null = this.route.snapshot.paramMap.get('id');
    if (!surveyId) return
    this.surveyService.setActiveSurveyId(surveyId)
    this.surveyService.getSurveyById(surveyId).subscribe((survey: Survey) => {
      this.survey = survey;
      this.surveyName.setValue(this.survey.name)
      this.surveyName.valueChanges.pipe(
        debounceTime(500)
      ).subscribe((updatedName: string) => {
        this.surveyService.updateSurveyName(updatedName, this.survey).subscribe();
      });
    });
  }

  public addQuestion(newQuestion: Question) {
    this.survey.questions = [
      ...this.survey.questions,
      newQuestion
    ];
    this.surveyService.updateSurveyById(this.survey).subscribe((survey: Survey) => {
      console.log('survey', survey);
      this.survey = survey
    });
  }

  public updateQuestion(question: Question) {
    const questionIndex = this.survey.questions.findIndex(question => question.id === question.id)
    this.survey.questions.splice(questionIndex, 1, question)
    this.surveyService.updateSurveyById(this.survey).subscribe((survey: Survey) => {
      this.survey = survey;
    });
  }

  public removeQuestionByIndex(index: number) {
    this.survey.questions.splice(index, 1);
    this.surveyService.updateSurveyById(this.survey).subscribe((survey: Survey) => {
      this.survey = survey
    })
  }

  public editQuestion(question: Question) {
    this.questionForEdit = question;
  }

  public preview(): void {
    window.open(this.survey.previewLink, '_blank');
  }

  public copySurveyLink() {
    this.clipboard.copy(this.survey.link);
  }

  public canExit(): boolean {
    return this.createQuesComp.questionForm.dirty
      ? window.confirm('You have unsaved changes on question form.  Are you sure you want to leave the page?')
      : true;
  };
}
