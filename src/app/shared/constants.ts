// export const QUESTION_TYPES = {
//   'singlePunch': 1,
//   'multiPunch': 2,
//   'openText': 3
// }

export const QUESTION_TYPES = [
  {
    id: 1,
    name: 'Single Punch'
  },
  {
    id: 2,
    name: 'Multi Punch'
  },
  {
    id: 3,
    name: 'Open Text'
  }
];

export const LOCALSTORAGE_KEYS = {
  auth: 'isAuthenticated',
  surveys: 'surveys',
  attended: 'attendedSurveysOfUser',
  response: 'response'
};
