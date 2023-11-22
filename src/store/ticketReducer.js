/* eslint-disable default-param-last */
import {
  FETCH_TICKETS_START,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_ERROR,
  ADD_ITEMS_TO_RENDER,
} from '../services/AviasalesServices.js'

const initialState = {
  tickets: [],
  loading: false,
  error: null,
  renderedItemsCount: 5,
}

function ticketsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TICKETS_START:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case FETCH_TICKETS_SUCCESS:
      return {
        ...state,
        loading: false,
        tickets: action.tickets,
      }

    case FETCH_TICKETS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    case ADD_ITEMS_TO_RENDER:
      return {
        ...state,
        renderedItemsCount: state.renderedItemsCount + action.count,
      }

    default:
      return state
  }
}

export default ticketsReducer
