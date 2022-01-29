import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Question from '../interfaces/question';
import Survey from '../interfaces/survey';
import ResponseData from '../interfaces/response';

import { ResponseService } from '../services/response.service';
import { SurveyService } from '../services/survey.service';
import { SharedService } from '../shared/shared.service';

import { LOCALSTORAGE_KEYS, QUESTION_TYPES } from '../shared/constants';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  public survey: Survey;
  public questionTypesObj: any;
  private response: any = {};
  public alreadyAttended: boolean = false;
  public isPreview: string|null = null;

  constructor(
    private surveyService: SurveyService,
    private sharedService: SharedService,
    private responseService: ResponseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const surveyId: string|null = this.route.snapshot.paramMap.get('id');
    if (!surveyId) return
    this.isPreview = this.route.snapshot.queryParamMap.get('preview');

    if (!this.isPreview) {
      this.alreadyAttended = this.checkForAlreadyAttended(Number(surveyId));
      if (this.alreadyAttended) {
        return;
      }
    }

    this.survey = this.surveyService.getSurveyById(Number(surveyId))
    this.questionTypesObj =  this.sharedService.covertArrayToObj(QUESTION_TYPES, 'name', 'id')
  }

  public updateResponse(event: any, questionId: number): void {
    this.response[questionId] = event;
  }

  public submit() {
    const finalData: Array<ResponseData> = [];
    const questions: Array<Question> = this.survey.questions;

    for (let questionId in this.response) {
      const question: Question|undefined = questions.find((question: Question) => question.id === Number(questionId));
      if (!question) continue;
      finalData.push({
        questionId: Number(questionId),
        type: question.type,
        response: this.response[questionId],
      })
    }
    this.surveyService.updateSurveyById({
      ...this.survey,
      responses: this.survey.responses + 1
    })
    this.responseService.submitResponse(this.survey.id, finalData);
    this.alreadyAttended = true;
    this.setOnLocalStorage();
  }

  private setOnLocalStorage(): void {
    const attendedSurveysOfUser: string|null = localStorage.getItem(LOCALSTORAGE_KEYS['attended']);
    if (!attendedSurveysOfUser) {
      localStorage.setItem(LOCALSTORAGE_KEYS['attended'], JSON.stringify([this.survey.id]));
      return;
    }
    const parsedSurveys: Array<number> = JSON.parse(attendedSurveysOfUser);
    parsedSurveys.push(this.survey.id);
    localStorage.setItem(LOCALSTORAGE_KEYS['attended'], JSON.stringify(parsedSurveys));
  }

  private checkForAlreadyAttended(surveyId: number): boolean {
    const attendedSurveysOfUser: string|null = localStorage.getItem(LOCALSTORAGE_KEYS['attended']);
    if (!attendedSurveysOfUser) {
      return false;
    }
    const parsedSurveys: Array<number> = JSON.parse(attendedSurveysOfUser);
    return parsedSurveys.includes(surveyId);
  }
}
