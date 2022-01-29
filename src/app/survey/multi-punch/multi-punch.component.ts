import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import Question from 'src/app/interfaces/question';

@Component({
  selector: 'app-multi-punch',
  templateUrl: './multi-punch.component.html',
  styleUrls: ['./multi-punch.component.scss']
})
export class MultiPunchComponent implements OnInit {

  @Input() question: Question;
  @Output() submitAnswer = new EventEmitter<Array<string>>();

  public optionForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (!this.question) return;
    this.createQuestionForm(this.question);

    this.optionForm.valueChanges.subscribe(value => {
      this.filterOptions(value);
    })

  }

  private createQuestionForm(question: Question): void {
    const optionEntries =  question.options.map(option => [option, false]);
    const optionObj = Object.fromEntries(optionEntries);
    this.optionForm = this.fb.group(optionObj);
  }

  private filterOptions(options: any): void {
    const asArray: Array<any> = Object.entries(options);
    const filtered: Array<any> = asArray.filter(([key, value]) => value);
    const answeredOptsObj: any = Object.fromEntries(filtered);
    const selectedOptions: Array<string> = Object.keys(answeredOptsObj);
    this.submitAnswer.emit(selectedOptions);
  }

}
