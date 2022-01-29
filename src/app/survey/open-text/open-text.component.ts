import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import Question from 'src/app/interfaces/question';

@Component({
  selector: 'app-open-text',
  templateUrl: './open-text.component.html',
  styleUrls: ['./open-text.component.scss']
})
export class OpenTextComponent implements OnInit {

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
