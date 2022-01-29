export default interface Question {
  id: number,
  text: string,
  type: number,
  options: Array<string>,
  createdOn: Date
}
