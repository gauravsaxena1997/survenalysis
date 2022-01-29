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
  // public surveys = [
  //   {
  //     id: 1,
  //     status: 1,
  //     name: 'Test 1',
  //     createdDate: new Date(),
  //     responses: 7
  //   },
  //   {
  //     id: 2,
  //     status: 1,
  //     name: 'Test 2',
  //     createdDate: new Date(),
  //     responses: 3
  //   },
  //   {
  //     id: 3,
  //     status: 0,
  //     name: 'Test 3',
  //     createdDate: new Date(),
  //     responses: 1
  //   },
  //   {
  //     id: 4,
  //     status: 1,
  //     name: 'Test 4',
  //     createdDate: new Date(),
  //     responses: 10
  //   }
  // ]

  constructor(
    private surveyService: SurveyService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.surveys = this.surveyService.getSurveys()
  }

  public removeSurveyById(surveyId: number): void {
    this.surveyService.removeSurveyById(surveyId);
  }

  public editSurveyById(surveyId: number): void {
    this.router.navigate(['/survey-scripting', surveyId])
  }

  public analyse(surveyId: number): void {
    this.router.navigate(['/analyse', surveyId]);

  }
}
