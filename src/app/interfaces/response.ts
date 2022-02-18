export interface ResponseData {
  questionId: number,
  type: number,
  response: string|Array<string>
}

export interface Response {
  id: string
  data: any
}