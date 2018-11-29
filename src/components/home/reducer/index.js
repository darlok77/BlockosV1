import { fromJS } from 'immutable'

import initialState from './initial-state'
import actionsType from '../actions/actions-type'

const updatePlayer = (state, action) => (
  fromJS(state)
    .setIn(['player'], action.player)
    .toJS()
)

const home = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.NEXT_PLAYER:
      return updatePlayer(state, action)
    default:
      return state
  }
}

export default home
