import actionsType from './actions-type'
import store from '../../../store'

// ici changer, retirer :{var}
export const updatePlayer = player => ({
  type: actionsType.NEXT_PLAYER,
  player
})

const updateWorld = world => ({
  type: actionsType.UPDATE_WORLD,
  world
})

const updateNumber = number => ({
  type: actionsType.NEW_NUMBER,
  number
})

export const updateTurn = turn => ({
  type: actionsType.NEW_TURN,
  turn
})

const updateBase = base => ({
  type: actionsType.UPDATE_BASE,
  base
})

export const nextPlayer = (player, base) => {
  let p = player
  if (base[p] <= 0) {
    p += 1
  }

  if (p < 4) {
    p += 1
    return p
  }

  p = 1
  return p
}

export const nextWorld = (world) => {
  store.dispatch(updateWorld(world))
}

export const newNumber = (number, flag) => {
  const { firstNb, secondNb } = number
  const numberUpdate = {
    firstNb,
    secondNb,
    flag
  }
  store.dispatch(updateNumber(numberUpdate))
}

export const newTurn = (number, actualTurn) => {
  let turn = {}
  if (actualTurn.nbTurn === 0) {
    console.log(`number reçu: ${number}`)

    switch (number) {
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
    }
  } else {
    turn = actualTurn
  }
  return turn
}

export const newBase = (player, base) => {
  let baseUpdate = base
  switch (player) {
    case '1':
      baseUpdate.B1 -= 1
      break
    case '2':
      baseUpdate.B2 -= 1
      break
    case '3':
      baseUpdate.B3 -= 1
      break
    case '4':
      baseUpdate.B4 -= 1
      break
    default:
      baseUpdate = base
  }
  store.dispatch(updateBase(baseUpdate))
  return baseUpdate
}
