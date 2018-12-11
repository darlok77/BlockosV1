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

const updateTurn = turn => ({
  type: actionsType.NEW_TURN,
  turn: { turn }
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

export const newNumber = (number) => {
  store.dispatch(updateNumber(number))
}

export const newTurn = (number) => {
  const turn = {}

  switch (number.number) {
    case 1:
      turn.nbTurn = 1
      turn.type = 'destroy'
      break
    case 2:
      turn.nbTurn = 1
      turn.type = 'def'
      break
    case 3:
      turn.nbTurn = 2
      turn.type = 'def'
      break
    case 4:
      turn.nbTurn = 3
      turn.type = 'def'
      break
    case 5:
      console.log('ici')
      turn.nbTurn = 1
      turn.type = 'att'
      break
    case 6:
      turn.nbTurn = 2
      turn.type = 'att'
      break
    default:
      turn.nbTurn = 0
      turn.type = 'init'
      console.log('bug')
  }
  turn.nbTurn -= 1

  store.dispatch(updateTurn(turn))
}
