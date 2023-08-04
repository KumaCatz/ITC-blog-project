export const notesReducerActions = {
  ADD_ITEM: 'ADD_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  SORT_BY_DATE: 'SORT_BY_DATE',
}

function notesReducer(state, action) {
  switch (action.type) {
    case notesReducerActions.ADD_ITEM:
      return [action.data, ...state]
    case notesReducerActions.DELETE_ITEM:
      return state.filter((item) => item !== action.data)
    case notesReducerActions.SORT_BY_DATE:
      return state.sort((a, b) => a.date - b.date)
    default:
      throw new Error()
  }
}