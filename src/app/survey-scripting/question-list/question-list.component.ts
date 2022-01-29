import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import Question from '../../interfaces/question';
import { QUESTION_TYPES } from '../../shared/constants';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  public questionTypesObj: any;
  @Input() questions: Array<Question> = []
  @Output() removeQuestionEvent = new EventEmitter<number>()
  @Output() editQuestionEvent = new EventEmitter<Question>()

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.questionTypesObj = this.sharedService.covertArrayToObj(QUESTION_TYPES, 'id', 'name');
  }

  public removeQuestionByIndex(index: number): void {
    this.removeQuestionEvent.emit(index)
  }

  public editQuestion(question: Question): void {
    this.editQuestionEvent.emit(question)
  }
}
