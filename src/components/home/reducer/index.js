import { fromJS } from 'immutable'

import initialState from './initial-state'
import actionsType from '../actions/actions-type'

const getMap = (state, action) => (
  fromJS(state)
    .setIn(['World'], action.data)
    .toJS()
)

const world = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.GET_LAST_EVENTS:
      return getMap(state, action)
    default:
      return state
  }
}

export default world
