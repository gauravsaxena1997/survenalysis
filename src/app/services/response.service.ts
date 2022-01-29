import { Injectable } from '@angular/core';
import { LOCALSTORAGE_KEYS, QUESTION_TYPES } from '../shared/constants';
import { SharedService } from '../shared/shared.service';

import ResponseData from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private responseData: any = {
    "1": {
      "1": [
        "test1@test.com",
        "test2@test.com",
        "test3@test.com",
        "test4@test.com",
        "test5@test.com"
      ],
      "2": {
        "Less then 18": 1,
        "40+": 2,
        "18-40": 2
      },
      "4": {
        "Yes": 2,
        "No": 2
      },
      "5": [
        "7",
        "10",
        "7",
        "9",
        "9"
      ],
      "6": {
        "Decreased": 2,
        "I don't consume tobacco": 2,
        "No change": 1
      },
      "7": {
        "Employed and currently engaged in work duties": 2,
        "Employed, in receipt of employment income, but not carrying out work duties": 1,
        "Unemployed": 1,
        "Other": 1
      },
      "8": {
        "Yes": 4,
        "No": 1
      },
      "9": {
        "Family, friends or colleagues": 3,
        "Consultations with health professionals": 3,
        "Social media, eg Twitter, Facebook, Whatsapp": 4,
        "Television": 2,
        "Newspapers": 1,
        "Other": 1
      }
    },
    "2": {
      "1": {
        "Good": 2,
        "Below Average": 2,
        "Excellent": 1
      },
      "2": {
        "Yes, but it doesn’t work well": 3,
        "Yes": 1,
        "No, I share with others": 1
      },
      "3": {
        "Tablet": 2,
        "Smartphone": 2,
        "Desktop": 1
      },
      "4": {
        "5-7 hours": 1,
        "1-3 hours": 1,
        "7-10 hours": 3
      },
      "5": {
        "Moderately helpful": 3,
        "Very helpful": 2
      },
      "6": {
        "Learning portal": 3,
        "Smart device": 5,
        "E-Books": 4,
        "Internet Conection": 2
      },
      "7": [
        "This is a test answer.",
        "This is again a test answer.",
        "This is a test answer too.",
        "Yes, again....",
        "Test again"
      ]
    }
  };

  public questionTypesObj: any;
  public questionTypesNameMapping: any;

  constructor(
    private sharedService: SharedService
  ) {
    this.questionTypesObj =  this.sharedService.covertArrayToObj(QUESTION_TYPES, 'name', 'id');
    this.questionTypesNameMapping =  this.sharedService.covertArrayToObj(QUESTION_TYPES, 'id', 'name');

    if (localStorage.getItem(LOCALSTORAGE_KEYS['response'])) {
      this.responseData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS['response']) as any);
    }
  }

  public submitResponse(surveyId: number, surveyResponse: Array<ResponseData>) {
    if (!this.responseData[surveyId]) {
      // this.initResponse(surveyId);
      this.responseData[surveyId] = {};
    }
    surveyResponse.forEach((quesResponse: ResponseData) => {
      if (quesResponse.type === this.questionTypesObj['Single Punch']) {
        const response: string = quesResponse.response as string;

        if (!this.responseData[surveyId][quesResponse.questionId]) {
          this.responseData[surveyId][quesResponse.questionId] = {};
        }

        if (!this.responseData[surveyId][quesResponse.questionId][response]) {
          this.responseData[surveyId][quesResponse.questionId][response] = 1;
        } else {
          this.responseData[surveyId][quesResponse.questionId][response] += 1;
        }
      } else if (quesResponse.type === this.questionTypesObj['Multi Punch']) {
        const response: Array<string> = quesResponse.response as Array<string>;

        if (!this.responseData[surveyId][quesResponse.questionId]) {
          this.responseData[surveyId][quesResponse.questionId] = {};
        }

        response.forEach((optionText: string) => {
          if (!this.responseData[surveyId][quesResponse.questionId][optionText]) {
            this.responseData[surveyId][quesResponse.questionId][optionText] = 1;
          } else {
            this.responseData[surveyId][quesResponse.questionId][optionText] += 1;
          }
        })

      } else {
        const response: string = quesResponse.response as string;

        if (!this.responseData[surveyId][quesResponse.questionId]) {
          this.responseData[surveyId][quesResponse.questionId] = [];
        }
        this.responseData[surveyId][quesResponse.questionId].push(response);
      }
    });
    localStorage.setItem(LOCALSTORAGE_KEYS['response'], JSON.stringify(this.responseData))
  }

  public getResponseBySurveyId(surveyId: number): ResponseData {
    return this.responseData[surveyId];
  }
}
