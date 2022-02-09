import question from './question'

export default interface Survey {
  id: string,
  name: string;
  responses: number,
  createdOn: Date,
  questions: Array<question>,
  link: string;
  previewLink: string;
}
