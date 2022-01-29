import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

import { SurveyService } from './../../services/survey.service';
import { QuestionService } from '../../services/question.service';

import Survey from '../../interfaces/survey';
import Question from '../../interfaces/question';
import { CreateQuestionComponent } from '../create-question/create-question.component';

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
    private router: Router,
    private questionService: QuestionService,
    private clipboard: Clipboard
  ) { }

  ngOnInit(): void {
    const surveyId: string|null = this.route.snapshot.paramMap.get('id');
    if (!surveyId) return
    this.surveyService.setActiveSurveyId(Number(surveyId))
    this.survey = this.surveyService.getSurveyById(Number(surveyId))
    this.surveyName.setValue(this.survey.name)
    this.surveyName.valueChanges.subscribe((updatedName: string) => {
      this.surveyService.updateSurveyName(updatedName);
    })
  }

  public addQuestion(newQuestion: Question) {
    this.survey = this.questionService.addQuestionInSurvey(newQuestion)
  }

  public updateQuestion(question: Question) {
    this.survey = this.questionService.updateQuestionInSurvey(question)
  }

  public removeQuestionByIndex(index: number) {
    this.survey = this.questionService.removeQuestionByIndex(index)
  }

  public editQuestion(question: Question) {
    this.questionForEdit = question;
  }

  public preview(): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['survey', this.survey.id], {queryParams: {preview: true}})
    );
    window.open(url, '_blank');
  }

  public copySurveyLink() {
    const link: string = this.surveyService.getSurveyLink(this.survey.id);
    this.clipboard.copy(link);
  }

  public canExit(): boolean {
    return this.createQuesComp.questionForm.dirty
      ? window.confirm('You have unsaved changes on question form.  Are you sure you want to leave the page?')
      : true;
  };
}