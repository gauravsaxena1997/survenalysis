import { Injectable } from '@angular/core';

import { SurveyService } from './survey.service';
import Question from '../interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private surveyService: SurveyService) { }

  public addQuestionInSurvey(question: Question) {
    const survey = this.surveyService.getActiveSurvey()
    survey.questions = [
      ...survey.questions,
      question
    ];
    this.surveyService.updateSurveyById(survey);
    return survey
  }

  public updateQuestionInSurvey(updatedQuestion: Question) {
    const survey = this.surveyService.getActiveSurvey()
    const questionIndex = survey.questions.findIndex(question => question.id === updatedQuestion.id)
    survey.questions.splice(questionIndex, 1, updatedQuestion)
    this.surveyService.updateSurveyById(survey);
    return survey
  }

  public removeQuestionByIndex(index: number) {
    const survey = this.surveyService.getActiveSurvey()
    survey.questions.splice(index, 1);
    this.surveyService.updateSurveyById(survey);
    return survey
  }

  public getNewQuestionId(): number {
    const survey = this.surveyService.getActiveSurvey()
    return survey.questions.length + 1
  }
}
