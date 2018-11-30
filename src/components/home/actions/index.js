import actionsType from './actions-type'
import store from '../../../store'

const updatePlayer = player => ({
  type: actionsType.NEXT_PLAYER,
  player: player * 1
})

const updateWorld = world => ({
  type: actionsType.UPDATE_WORLD,
  world: { world }
})

const updateNumber = number => ({
  type: actionsType.NEW_NUMBER,
  number: { number }
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

export const nextWorld = (id, w, player) => {
  const world = w
  const parseId = id.split('_', 2)
  const idRow = parseInt(parseId[0].substr(1), 10)
  const idCol = parseInt(parseId[1], 10)
  world[idRow][idCol] = player

  store.dispatch(updateWorld(world))
}

export const nextNumber = () => {
  const number1 = Math.floor(Math.random() * (7 - 1) + 1)
  const number2 = Math.floor(Math.random() * (7 - 1) + 1)
  const sum = number1 + number2
  const possibility = {
    fisrt: [number1, number2]
  }

  if (sum <= 6) {
    possibility.second = sum
  }

  store.dispatch(updateNumber(possibility))
}
