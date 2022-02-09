import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import * as shortid from 'shortid';

import Survey from '../interfaces/survey';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private activeSurveyId: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  public getSurveys(): Observable<Array<Survey>> {
    return this.http.get<Array<Survey>>(`${environment.BACKEND_URL}/surveys`);
  }

  public setActiveSurveyId(id: string) {
    this.activeSurveyId = id
  }

  public getSurveyById(id: string): Observable<Survey> {
    return this.http.get<Survey>(`${environment.BACKEND_URL}/surveys/${id}`);
  }

  public updateSurveyName(updatedName: string, survey: Survey): Observable<Survey> {
    survey.name = updatedName;
    return this.http.put<Survey>(`${environment.BACKEND_URL}/surveys/${survey.id}`, survey);
  }

  public updateSurveyById(survey: Survey): Observable<Survey> {
    return this.http.put<Survey>(`${environment.BACKEND_URL}/surveys/${survey.id}`, survey);
  }

  public removeSurveyById(id: string): Observable<Survey> {
    return this.http.delete<Survey>(`${environment.BACKEND_URL}/surveys/${id}`);
  }

  public getNewSurveyId(): string {
    return shortid.generate()
  }

  public getActiveSurvey(): Observable<Survey> {
    return this.http.get<Survey>(`${environment.BACKEND_URL}/surveys/${this.activeSurveyId}`);

  }

  public addNewSurvey(survey: Survey): Observable<Survey> {
    return this.http.post<Survey>(`${environment.BACKEND_URL}/surveys`, survey);
  }

  public createSurveyLinks(surveyId: string): any {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['survey', surveyId])
    );

    const previewUrl = this.router.serializeUrl(
      this.router.createUrlTree(['survey', surveyId], {queryParams: {preview: true}})
    );

    return {
      link: `${window.location.protocol}//${window.location.host}${url}`,
      previewLink: `${window.location.protocol}//${window.location.host}${previewUrl}`
    }
  }
}
