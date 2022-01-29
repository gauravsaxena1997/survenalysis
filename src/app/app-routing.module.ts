import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SurveyLayoutComponent } from './survey-scripting/survey-layout/survey-layout.component';
import { SurveyComponent } from './survey/survey.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AnalyzeComponent } from './components/analyze/analyze.component';

import { AuthGuard } from './guards/auth.guard';
import { ProtectFormDataGuard } from './guards/protect-form-data.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'survey-scripting/:id',
    canActivate: [AuthGuard],
    component: SurveyLayoutComponent,
    canDeactivate: [ProtectFormDataGuard],
  },
  {
    path: 'survey/:id',
    component: SurveyComponent
  },
  {
    path: 'analyse/:id',
    canActivate: [AuthGuard],
    component: AnalyzeComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
