import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Question from 'src/app/interfaces/question';
import Survey from 'src/app/interfaces/survey';
import { ResponseService } from 'src/app/services/response.service';
import { SurveyService } from 'src/app/services/survey.service';
import { MESSAGES } from '../../shared/constants';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {
  public response: any;
  public survey: Survey;
  public displayData: Array<any> = [];
  public questionTypesObj: any = this.responseService.questionTypesObj;
  public questionTypesNameMapping: any = this.responseService.questionTypesNameMapping;
  public message: string = '';

  constructor(
    private responseService: ResponseService,
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const surveyId: string|null = this.route.snapshot.paramMap.get('id');
    if (!surveyId) return;
    this.surveyService.getSurveyById(surveyId).subscribe((survey: Survey) => {
      this.survey = survey;
      if (!this.survey) {
        this.message = MESSAGES['SURVEY_NOT_AVAILABLE'];
        return;
      }
      this.response = this.responseService.getResponseBySurveyId(surveyId);
      if (!this.response) {
        this.message = MESSAGES['NO_RESPONSE_YET'];
        return;
      }
      this.prepareData();
    })
  }

  private prepareData() {
    const questions: Array<Question> = this.survey.questions;
    const totalResponses: number = this.survey.responses;
    questions.forEach((question: Question) => {
      const questionId: number = question.id;
      const data: any = {
        questionId,
        questionText: question.text,
        questionType: question.type,
      };

      if (question.type === this.questionTypesObj['Open Text']) {
        data['responses'] = this.response[questionId];
      } else { // Singlepunch and Multipunch
        data['responses'] = [];
        question.options.forEach((option: string) => {
          data['responses'].push({
            optionText: option,
            percentage: this.calculateResPercentage(this.response[questionId][option] || 0, totalResponses)
          })
        })
      }

      this.displayData.push(data);
    })
  }

  public editSurvey(): void {
    this.router.navigate(['survey-scripting', this.survey.id]);
  }

  private calculateResPercentage = (occurance: number, total: number): string =>  ((occurance / total) * 100).toFixed(2);
}
