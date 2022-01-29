import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import Question from 'src/app/interfaces/question';

@Component({
  selector: 'app-single-punch',
  templateUrl: './single-punch.component.html',
  styleUrls: ['./single-punch.component.scss']
})
export class SinglePunchComponent implements OnInit {

  @Input() question: Question;
  @Output() submitAnswer = new EventEmitter<string>();

  public answer: FormControl = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    this.answer.valueChanges.subscribe(value =>{
      this.submitAnswer.emit(value);
    })
  }

}
