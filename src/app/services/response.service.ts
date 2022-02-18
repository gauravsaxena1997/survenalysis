import { Injectable } from '@angular/core';
import { QUESTION_TYPES } from '../shared/constants';
import { SharedService } from '../shared/shared.service';

import { Response, ResponseData } from '../interfaces/response';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  public questionTypesObj: any;
  public questionTypesNameMapping: any;

  constructor(
    private sharedService: SharedService,
    private http: HttpClient
  ) {
    this.questionTypesObj =  this.sharedService.covertArrayToObj(QUESTION_TYPES, 'name', 'id');
    this.questionTypesNameMapping =  this.sharedService.covertArrayToObj(QUESTION_TYPES, 'id', 'name');
  }

  public submitResponse(surveyId: string, surveyResponse: Array<ResponseData>) {
    this.getResponseBySurveyId(surveyId).subscribe(
      (res: Response) => {
        const data = this.prepareResponseData(surveyResponse, res)
        this.http.put(`${environment.BACKEND_URL}/responses/${surveyId}`, data).subscribe();
      },
      (err: HttpErrorResponse) => {
        if (err.status !== 404) {
          console.log('Error:', err);
        }
        // No response found, so we have to create a new one
        const responseData: Response = {
          id: surveyId,
          data: {}
        };
        const data = this.prepareResponseData(surveyResponse, responseData);
        this.http.post(`${environment.BACKEND_URL}/responses`, data).subscribe();
      }
    )
  }

  private prepareResponseData (surveyResponse: Array<ResponseData>, responseData: Response): Response {
    surveyResponse.forEach((quesResponse: ResponseData) => {
      if (quesResponse.type === this.questionTypesObj['Single Punch']) {
        const response: string = quesResponse.response as string;

        if (!responseData['data'][quesResponse.questionId]) {
          responseData['data'][quesResponse.questionId] = {};
        }

        if (!responseData['data'][quesResponse.questionId][response]) {
          responseData['data'][quesResponse.questionId][response] = 1;
        } else {
          responseData['data'][quesResponse.questionId][response] += 1;
        }
      } else if (quesResponse.type === this.questionTypesObj['Multi Punch']) {
        const response: Array<string> = quesResponse.response as Array<string>;

        if (!responseData['data'][quesResponse.questionId]) {
          responseData['data'][quesResponse.questionId] = {};
        }

        response.forEach((optionText: string) => {
          if (!responseData['data'][quesResponse.questionId][optionText]) {
            responseData['data'][quesResponse.questionId][optionText] = 1;
          } else {
            responseData['data'][quesResponse.questionId][optionText] += 1;
          }
        })

      } else {
        const response: string = quesResponse.response as string;

        if (!responseData['data'][quesResponse.questionId]) {
          responseData['data'][quesResponse.questionId] = [];
        }
        responseData['data'][quesResponse.questionId].push(response);
      }
    });

    return responseData;
  }

  public getResponseBySurveyId(surveyId: string): Observable<Response> {
    return this.http.get<Response>(`${environment.BACKEND_URL}/responses/${surveyId}`)
  }
}
