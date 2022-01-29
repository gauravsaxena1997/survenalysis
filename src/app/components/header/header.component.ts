import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event as NavigationEvent } from '@angular/router';
import { filter } from 'rxjs';
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
    const id = this.surveyService.getNewSurveyId()
    const newSurvey = {
      id,
      name: `Test Survey ${id}`,
      createdOn: new Date(),
      questions: [],
      responses: 0
    };
    this.surveyService.addNewSurvey(newSurvey)
    this.router.navigate(['/survey-scripting', id])
  }

  public logout(): void {
    this.authService.logout();
  }
}
