import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event as NavigationEvent } from '@angular/router';
import { filter } from 'rxjs';
import Survey from 'src/app/interfaces/survey';
import { AuthService } from '../../services/auth.service';

import { SurveyService } from './../../services/survey.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public currentRoute: string;
  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    // https://www.angularjswiki.com/angular/how-to-get-current-route-in-angular/
    // https://angular.io/api/router/Event
    // https://www.tektutorialshub.com/angular/angular-router-events/
    // https://github.com/angular/angular/issues/15439
    this.router.events
      .pipe(filter((event: NavigationEvent) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEvent) => {
          this.currentRoute = (event as NavigationEnd).url;
      });
  }

  public createSurvey() {
    const surveyId = this.surveyService.getNewSurveyId()
    const { link, previewLink }: any = this.surveyService.createSurveyLinks(surveyId);
    const newSurvey = {
      id: surveyId,
      name: `Test Survey ${surveyId}`,
      createdOn: new Date(),
      questions: [],
      responses: 0,
      link,
      previewLink
    };
    this.surveyService.addNewSurvey(newSurvey).subscribe((survey: Survey) => {
      this.router.navigate(['/survey-scripting', surveyId])
    })
  }

  public logout(): void {
    this.authService.logout();
  }
}
