import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges  } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import Question from '../../interfaces/question';
import { QUESTION_TYPES } from '../../shared/constants';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit, OnChanges {

  @Input() surveyId: string;
  @Input() question: Question;
  @Input() totalquestions: number;
  @Output() newQuestionEvent = new EventEmitter<Question>();
  @Output() updateQuestionEvent = new EventEmitter<Question>();

  public isEdit: boolean = false;
  public title: string = 'Create new question';
  public questionTypes: Array<any>;

  constructor() { }

  ngOnInit(): void {
    this.questionTypes = QUESTION_TYPES;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['question'] && changes['question'].currentValue) {
      this.isEdit = true;
      const question: Question = changes['question'].currentValue;
      this.title = `Edit question (ID: ${question.id})`;
      this.resetQuestionForm();
      this.questionForm.patchValue(question);
      // We need to change each string in options array to Form Control first
      question.options.forEach((option) => {
        this.options.push(new FormControl(option))
      })
    }
  }

  get options(): FormArray {
    return <FormArray> this.questionForm.get('options');
  }

  get newOptionText(): FormControl {
    return <FormControl> this.questionForm.get('newOptionText');
  }

  public questionForm = this.createQuestionForm()

  private createQuestionForm(): FormGroup {
    return new FormGroup({
      text: new FormControl('', Validators.required),
      type: new FormControl(1, Validators.required),
      options: new FormArray([]),
      newOptionText: new FormControl('')
    })
  }

  public addOption() {
    if (!this.newOptionText) return
    this.options.push(new FormControl(this.newOptionText.value));
    this.newOptionText.setValue('');
  }

  public removeOption (index: number) {
    this.options.removeAt(index);
  }

  drop(event: CdkDragDrop<FormGroup[]>) {
    const dir = event.currentIndex > event.previousIndex ? 1 : -1;
    const from = event.previousIndex;
    const to = event.currentIndex;

    const temp = this.options.at(from);
    for (let i = from; i * dir < to * dir; i = i + dir) {
      const current = this.options.at(i + dir);
      this.options.setControl(i, current);
    }
    this.options.setControl(to, temp);
  }

  public createQuestion() {
    const questionForm = this.questionForm.value;
    const newQuestion: Question = {
      id: this.isEdit ? this.question.id : this.totalquestions + 1,
      text: questionForm.text,
      type: questionForm.type,
      options: questionForm.options,
      createdOn: this.isEdit ? this.question.createdOn : new Date()
    };

    if (this.isEdit) {
      this.updateQuestionEvent.emit(newQuestion);
      this.isEdit = false;
      this.title = 'Create new question';
    } else {
      this.newQuestionEvent.emit(newQuestion);
    }
    this.resetQuestionForm()
  }

  private resetQuestionForm() {
    this.options.clear()
    this.questionForm.reset({
      text: '',
      type: 1,
      options: [],
      newOptionText: ''
    })
  }

}
