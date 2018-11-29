import actionsType from './actions-type'
import store from '../../../store'

const updatePlayer = player => ({
  type: actionsType.NEXT_PLAYER,
  player: player * 1
})

export const nextPlayer = (player) => {
  let p = player

  if (p >= 4) {
    p = 1
  } else {
    p += 1
  }
  store.dispatch(updatePlayer(p))
}
