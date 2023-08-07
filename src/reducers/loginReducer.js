export const loginReducerActions = {
  COMPARE_USERNAME: 'COMPARE_USERNAME',
  COMPARE_PASSWORD: 'COMPARE_PASSWORD',
  SORT_BY_DATE: 'SORT_BY_DATE',
}

export  function loginReducer(state, action) {
  switch (action.type) {
    case loginReducerActions.COMPARE_USERNAME:
      return [action.data, ...state]
    case loginReducerActions.COMPARE_PASSWORD:
      return state.filter((item) => item !== action.data)
    case loginReducerActions.SORT_BY_DATE:
      return state.sort((a, b) => a.date - b.date)
    default:
      throw new Error()
  }
}