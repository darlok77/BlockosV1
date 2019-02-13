import actionsType from './actions-type'
import store from '../../../store'

// ici changer, retirer :{var}
export const updatePlayer = player => ({
  type: actionsType.NEXT_PLAYER,
  player: player * 1
})

const updateWorld = world => ({
  type: actionsType.UPDATE_WORLD,
  world
})

const updateNumber = number => ({
  type: actionsType.NEW_NUMBER,
  number: { number }
})

export const updateTurn = turn => ({
  type: actionsType.NEW_TURN,
  turn
})

export const nextPlayer = (player) => {
  let p = player

  if (p < 5) {
    p += 1

    return p
  }

  p = 1

  return p
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
  const isArray = Array.isArray(number)
  let first = null
  let second = null
  if (isArray) {
    [first, second] = number
    console.log('is a array')
  } else {
    console.log('is not a array')
    first = number
    second = null
  }
  const numberUpdate = {
    firstNb: first,
    secondNb: second
  }
  store.dispatch(updateNumber(numberUpdate))
}

export const newTurn = (number, actualTurn) => {
  let turn = {}
  console.log('blooo')
  console.log(number)
  console.log(actualTurn.nbTurn)
  if (actualTurn.nbTurn === 0) {
    switch (number) {
      case 1:
        turn.nbTurn = 1
        turn.type = 'destroy'
        console.log('recois 1')
        break
      case 2:
        turn.nbTurn = 1
        turn.type = 'def'
        console.log('recois 2')
        break
      case 3:
        turn.nbTurn = 2
        turn.type = 'def'
        console.log('recois 3')
        break
      case 4:
        turn.nbTurn = 3
        turn.type = 'def'
        console.log('recois 4')
        break
      case 5:
        turn.nbTurn = 1
        turn.type = 'att'
        console.log('recois 5')
        break
      case 6:
        turn.nbTurn = 2
        turn.type = 'att'
        console.log('recois 6')
        break
      default:
        turn.nbTurn = 0
        turn.type = 'init'
        console.log('bug')
    }
  } else {
    turn = actualTurn
  }

  turn.nbTurn -= 1

  return turn
}
