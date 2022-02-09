import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Survey from '../../interfaces/survey';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public surveys: Array<Survey>;

  constructor(
    private surveyService: SurveyService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.surveys = this.surveyService.getSurveys();
  }

  public removeSurveyById(surveyId: string): void {
    this.surveys = this.surveyService.removeSurveyById(surveyId);
  }

  public editSurveyById(surveyId: string): void {
    this.router.navigate(['/survey-scripting', surveyId]);
  }

  public analyse(surveyId: string): void {
    this.router.navigate(['/analyse', surveyId]);
  }

  public preview(previewLink: string): void {
    window.open(previewLink, '_blank');
  }
}
