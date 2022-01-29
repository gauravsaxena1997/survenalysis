import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import Survey from '../interfaces/survey';
import { LOCALSTORAGE_KEYS } from '../shared/constants'

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private surveyData: Array<Survey> = [
    {
      "id": 1,
      "name": "Social Impact of COVID-19 Survey",
      "createdOn": new Date("2022-01-29T14:12:11.565Z"),
      "link": "https://survenalysis.web.app/survey/1",
      "previewLink": "https://survenalysis.web.app/survey/1?preview=true",
      "questions": [
        {
          "id": 1,
          "text": "Please enter your email address.",
          "type": 3,
          "options": [],
          "createdOn": new Date("2022-01-29T14:16:24.984Z")
        },
        {
          "id": 2,
          "text": "What is your age?",
          "type": 1,
          "options": [
            "Less then 18",
            "18-40",
            "40+"
          ],
          "createdOn": new Date("2022-01-29T14:18:09.369Z")
        },
        {
          "id": 4,
          "text": "Is there a household member currently in education?",
          "type": 1,
          "options": [
            "Yes",
            "No"
          ],
          "createdOn": new Date("2022-01-29T14:18:45.608Z")
        },
        {
          "id": 5,
          "text": "On a scale of 0 to 10, How satisfied are you with the financial situation of your household?",
          "type": 3,
          "options": [],
          "createdOn": new Date("2022-01-29T14:19:33.464Z")
        },
        {
          "id": 6,
          "text": "Has your consumption of tobacco products changed?",
          "type": 1,
          "options": [
            "Increased",
            "Decreased",
            "No change",
            "I don't consume tobacco"
          ],
          "createdOn": new Date("2022-01-29T14:21:53.929Z")
        },
        {
          "id": 7,
          "text": "What is your employment status?",
          "type": 1,
          "options": [
            "Employed and currently engaged in work duties",
            "Employed, in receipt of employment income, but not carrying out work duties",
            "Unemployed",
            "Other"
          ],
          "createdOn": new Date("2022-01-29T14:23:06.137Z")
        },
        {
          "id": 8,
          "text": "Are you currently working from home?",
          "type": 1,
          "options": [
            "Yes",
            "No"
          ],
          "createdOn": new Date("2022-01-29T14:23:23.968Z")
        },
        {
          "id": 9,
          "text": "Which of the following sources of information do you use to stay informed about Covid-19? (Tick all that apply)",
          "type": 2,
          "options": [
            "Newspapers",
            "Television",
            "Social media, eg Twitter, Facebook, Whatsapp",
            "Family, friends or colleagues",
            "Consultations with health professionals",
            "Other"
          ],
          "createdOn": new Date("2022-01-29T14:24:56.641Z")
        }
      ],
      "responses": 8
    },
    {
      "id": 2,
      "name": "Distance learning survey",
      "createdOn": new Date("2022-01-29T14:41:32.920Z"),
      "link": "https://survenalysis.web.app/survey/2",
      "previewLink": "https://survenalysis.web.app/survey/2?preview=true",
      "questions": [
        {
          "id": 1,
          "text": "How do you feel overall about distance education?",
          "type": 1,
          "options": [
            "Poor",
            "Below Average",
            "Average",
            "Good",
            "Excellent"
          ],
          "createdOn": new Date("2022-01-29T14:42:22.208Z")
        },
        {
          "id": 2,
          "text": "Do you have access to a device for learning online?",
          "type": 1,
          "options": [
            "Yes",
            "Yes, but it doesn’t work well",
            "No, I share with others"
          ],
          "createdOn": new Date("2022-01-29T14:42:56.734Z")
        },
        {
          "id": 3,
          "text": "What device do you use for distance learning?",
          "type": 1,
          "options": [
            "Laptop",
            "Desktop",
            "Tablet",
            "Smartphone"
          ],
          "createdOn": new Date("2022-01-29T14:43:30.038Z")
        },
        {
          "id": 4,
          "text": "How much time do you spend each day on an average on distance education?",
          "type": 1,
          "options": [
            "1-3 hours",
            "3-5 hours",
            "5-7 hours",
            "7-10 hours",
            "10+ hours"
          ],
          "createdOn": new Date("2022-01-29T14:44:31.509Z")
        },
        {
          "id": 5,
          "text": " How helpful your [School or University] has been in offering you the resources to learn from home?",
          "type": 1,
          "options": [
            "Not at all helpful",
            "Slightly helpful",
            "Moderately helpful",
            "Very helpful"
          ],
          "createdOn": new Date("2022-01-29T14:44:58.757Z")
        },
        {
          "id": 6,
          "text": "What resouces provided by your institution?",
          "type": 2,
          "options": [
            "Learning portal",
            "Smart device",
            "Internet Conection",
            "E-Books"
          ],
          "createdOn": new Date("2022-01-29T14:47:17.387Z")
        },
        {
          "id": 7,
          "text": " How stressful is distance learning for you during the COVID-19 pandemic?",
          "type": 3,
          "options": [],
          "createdOn": new Date("2022-01-29T14:47:30.971Z")
        }
      ],
      "responses": 5
    }
  ];


  private activeSurveyId: number = -1;

  constructor(private router: Router) { }

  public getSurveys() {
    return this.surveys
  }

  public setActiveSurveyId(id: number) {
    this.activeSurveyId = id
  }

  get surveys(): Array<Survey> {
    if (localStorage.getItem(LOCALSTORAGE_KEYS['surveys'])) {
      this.surveyData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS['surveys']) as string)
    }
    return this.surveyData
  }

  public getSurveyById(id: number): any {
    return this.surveys.find((survey: any) => survey.id === id)
  }

  public updateSurveyName(updatedName: string): void {
    const index: number = this.surveys.findIndex((survey: Survey) => survey.id === this.activeSurveyId)
    this.surveyData[index].name = updatedName;
    localStorage.setItem(LOCALSTORAGE_KEYS['surveys'], JSON.stringify(this.surveyData))
  }

  public updateSurveyById(survey: Survey): void {
    const index: number = this.surveys.findIndex((survey: Survey) => survey.id === this.activeSurveyId)
    this.surveyData.splice(index, 1, survey);
    localStorage.setItem(LOCALSTORAGE_KEYS['surveys'], JSON.stringify(this.surveyData))
  }

  public removeSurveyById(id: number): Array<Survey> {
    const index: number = this.surveys.findIndex((survey: Survey) => survey.id === id)
    this.surveyData.splice(index, 1);
    if (!this.surveyData.length) {
      localStorage.removeItem(LOCALSTORAGE_KEYS['surveys']);
    } else {
      localStorage.setItem(LOCALSTORAGE_KEYS['surveys'], JSON.stringify(this.surveyData));
    }
    return this.surveyData;
  }

  public getNewSurveyId(): number {
    return this.surveys.length + 1
  }

  public getActiveSurvey(): Survey {
    return this.getSurveyById(this.activeSurveyId)
  }

  public addNewSurvey(survey: Survey): void {
    this.surveyData = [
      ...this.surveys,
      survey
    ];
    localStorage.setItem(LOCALSTORAGE_KEYS['surveys'], JSON.stringify(this.surveyData))
  }

  public getSurveyLink(surveyId: number): string {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['survey', surveyId])
    );
    return `${window.location.protocol}//${window.location.host}${url}`;
  }

  public getSurveyPreviewLink(surveyId: number): string {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['survey', surveyId], {queryParams: {preview: true}})
    );
    return `${window.location.protocol}//${window.location.host}${url}`;
  }

  public createSurveyLinks(surveyId: number): any {
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
