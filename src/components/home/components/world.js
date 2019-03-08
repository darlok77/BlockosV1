import React from 'react'
import { connect } from 'react-redux'

import {
  /* nextWorld, */
  newTurn,
  nextPlayer,
  newNumber,
  updatePlayer,
  updateTurn
} from '../actions'

class World extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      world: props.world,
      turnState: props.turn,
      firstEnd: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.initBlock()
    this.firstBlockPlayable(null, null)
    // ici component will update si il y a un number mettre celu la a -2
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log('componentWillUpdate')
    const { turnState } = this.state
    if (nextState.turnState !== turnState) {
      console.log('bla')
      console.log(nextState.turnState)
      console.log(turnState)
    }
    if (nextProps.number.flag) {
      this.newPlayerTurn(nextProps)
      console.log('ble')
      console.log(nextState.turnState)
      console.log(turnState)
    }
  }

  setBlock(el, player) {
    const element = el
    const { home } = this.props
    const { turn } = home
    const entity0 = 'entity0'
    const entity1 = 'entity1'
    const entity2 = 'entity2'
    const entity3 = 'entity3'
    const entity4 = 'entity4'
    switch (player) {
      case 1:
        element.className = entity1
        element.dataset.value = 1
        this.blockDestroy(entity1, undefined)
        break
      case 2:
        element.className = entity2
        element.dataset.value = 2
        this.blockDestroy(entity2, undefined)
        break
      case 3:
        element.className = entity3
        element.dataset.value = 3
        this.blockDestroy(entity3, undefined)
        break
      case 4:
        element.className = entity4
        element.dataset.value = 4
        this.blockDestroy(entity4, undefined)
        break
      default:
        element.className = entity0
        element.dataset.value = 0
        this.blockDestroy(entity0, undefined)
    }
    if (turn.type === 'destroy') {
      element.className = 'entity-1'
      element.dataset.value = -1
    }
  }

  setPlayableAfterDestroy(x, y) {
    const elLeft = document.querySelector(`#I${x}_${y - 1}`)
    const elRight = document.querySelector(`#I${x}_${y + 1}`)
    const elTop = document.querySelector(`#I${x - 1}_${y}`)
    const elBottom = document.querySelector(`#I${x + 1}_${y}`)
    if (elLeft !== null) {
      this.elPlayable(elLeft)
    }
    if (elRight !== null) {
      this.elPlayable(elRight)
    }
    if (elTop !== null) {
      this.elPlayable(elTop)
    }
    if (elBottom !== null) {
      this.elPlayable(elBottom)
    }
  }

  nextBlockPlayable(el) {
    const { world } = this.props // ICI props vienne pas de home ?
    const elId = el.id
    const parseId = elId.split('_', 2)
    const idRow = parseInt(parseId[0].substr(1), 10)
    const idCol = parseInt(parseId[1], 10)
    const elLeft = document.querySelector(`#I${idRow}_${idCol - 1}`)
    const elRight = document.querySelector(`#I${idRow}_${idCol + 1}`)
    const elTop = document.querySelector(`#I${idRow - 1}_${idCol}`)
    const elBottom = document.querySelector(`#I${idRow + 1}_${idCol}`)
    let element = ''
    let base = ''

    world.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        element = document.querySelector(`#I${rowIndex}_${colIndex}`)
        element.style.pointerEvents = 'none'
        element.style.opacity = '0.33'
        if (element.className === el.className && element.textContent === 'B') {
          base = element
        }
      })
    })

    if (elLeft !== null && this.friendlyNeighbor(idRow, idCol - 1, el.className)) {
      this.elPlayable(elLeft)
    }
    if (elRight !== null && this.friendlyNeighbor(idRow, idCol + 1, el.className)) {
      this.elPlayable(elRight)
    }
    if (elTop !== null && this.friendlyNeighbor(idRow - 1, idCol, el.className)) {
      this.elPlayable(elTop)
    }
    if (elBottom !== null && this.friendlyNeighbor(idRow + 1, idCol, el.className)) {
      this.elPlayable(elBottom)
    }
    base.style.pointerEvents = 'none'
    base.style.opacity = '0.33'
  }

  blockPlayable(entity) {
    const { world } = this.props // ICI props vienne pas de home ?
    let el
    let dataValue

    world.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        el = document.querySelector(`#I${rowIndex}_${colIndex}`)
        dataValue = el.dataset.value
        el.style.pointerEvents = 'auto'
        el.style.opacity = '1'
        /* if (this.friendlyNeighbor(rowIndex, colIndex, entity) && turn.nbTurn !== 0) {
          el.style.pointerEvents = 'none'
          el.style.opacity = '0.33'
        } */

        if (!this.friendlyNeighbor(rowIndex, colIndex, entity)) { // no neighbord
          el.style.pointerEvents = 'none'
          el.style.opacity = '0.33'
        } else if (dataValue === '1' || dataValue === '2' || dataValue === '3' || dataValue === '4') {
          // belong to a player

          if (dataValue === entity.substr(6)) { // our block
            el.style.pointerEvents = 'none'
            el.style.opacity = '0.33'
          } else if (el.textContent !== 'V' || el.textContent !== 'B') { // not a base or village
            el.style.pointerEvents = 'none'
            el.style.opacity = '0.33'
          }
        } else if (dataValue === 'X' || dataValue === '-1') {
          el.style.pointerEvents = 'none'
          el.style.opacity = '0.33'
        }
      })
    })
  }

  firstBlockPlayable(player, type) {
    let entity

    switch (player) {
      case 1:
        entity = 'entity1'
        break
      case 2:
        entity = 'entity2'
        break
      case 3:
        entity = 'entity3'
        break
      case 4:
        entity = 'entity4'
        break
      default:
        entity = 'entityA'
    }

    // console.log(`turn = ${turn.nbTurn}`)
    // console.log(`player = ${player}`)
    if (type !== 'destroy') {
      this.blockPlayable(entity)
    } else {
      this.blockDestroyable(entity)
    }
  }

  elPlayable(element) {
    const el = element
    const dataValue = el.dataset.value
    if (dataValue === '1' || dataValue === '2' || dataValue === '3' || dataValue === '4') {
      // belong to a player
      if (el.textContent === 'V' || el.textContent === 'B') { // is a base or village
        el.style.pointerEvents = 'auto'
        el.style.opacity = '1'
      }
    } else if (dataValue !== 'X' && dataValue !== '-1') {
      el.style.pointerEvents = 'auto'
      el.style.opacity = '1'
    }
  }

  blockDestroyable(entity) {
    console.log('blockDestroyable')
    const { world } = this.props // ICI props vienne pas de home ?
    let el = ''

    world.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        el = document.querySelector(`#I${rowIndex}_${colIndex}`)
        el.style.pointerEvents = 'none'
        el.style.opacity = '0.33'
        if (el.className !== entity && el.className !== 'entity0' && el.className !== 'entity-1') {
          if (el.textContent !== 'B' && el.textContent !== 'X' && el.textContent !== 'V') {
            el.style.pointerEvents = 'auto'
            el.style.opacity = '1'
          }
        }
      })
    })
  }

  newPlayerTurn(nextProps) {
    const { turnState } = this.state
    console.log('ici')
    console.log(turnState)
    console.log(nextProps.turn)
    this.setState({
      turnState: nextProps.turn
    })
    newNumber(nextProps.number, false)
    this.nextPlayer(nextProps.player)
    console.log('-------')
    // this.firstBlockPlayable(nextProps.player, nextProps.turn.type)
    // this.blockDestroy(`entity${nextProps.player}`, undefined)
  }

  destroyLoop(x, y, entity, callback) {
    const tabNeighbord = this.DestroyNeighbor(x, y)
    if (this.friendlyNeighbor(x, y, entity)) {
      this.setPlayableAfterDestroy(x, y, entity)
    }
    if (tabNeighbord.length !== 0) {
      tabNeighbord.forEach((neighbord) => {
        const parseId = neighbord.split('_', 2)
        const idRow = parseInt(parseId[0].substr(1), 10)
        const idCol = parseInt(parseId[1], 10)
        if (this.friendlyNeighbor(x, y, entity)) {
          this.setPlayableAfterDestroy(idRow, idCol, entity)
          callback(idRow, idCol, entity)
        }
      })
    }
  }

  blockDestroy(entity, element) {
    const { world } = this.props // ICI props vienne pas de home ?
    let el

    if (!element) {
      world.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
          el = document.querySelector(`#I${rowIndex}_${colIndex}`)
          if (el.className === 'entity-1') {
            this.destroyLoop(rowIndex, colIndex, entity, () => {})
          }
        })
      })
    } else {
      const parseId = element.id.split('_', 2)
      const idRow = parseInt(parseId[0].substr(1), 10)
      const idCol = parseInt(parseId[1], 10)
      this.destroyLoop(idRow, idCol, entity, () => {})
    }
  }

  friendlyNeighbor(x, y, entity) {
    const elLeft = document.querySelector(`#I${x}_${y - 1}`)
    const elRight = document.querySelector(`#I${x}_${y + 1}`)
    const elTop = document.querySelector(`#I${x - 1}_${y}`)
    const elBottom = document.querySelector(`#I${x + 1}_${y}`)

    if (elLeft !== null && (elLeft.className === entity)) {
      return true
    }
    if (elRight !== null && (elRight.className === entity)) {
      return true
    }
    if (elTop !== null && (elTop.className === entity)) {
      return true
    }
    if (elBottom !== null && (elBottom.className === entity)) {
      return true
    }
    return false
  }

  DestroyNeighbor(x, y) {
    const elLeft = document.querySelector(`#I${x}_${y - 1}`)
    const elRight = document.querySelector(`#I${x}_${y + 1}`)
    const elTop = document.querySelector(`#I${x - 1}_${y}`)
    const elBottom = document.querySelector(`#I${x + 1}_${y}`)
    const tabNeighbord = []

    if (elLeft !== null && elLeft.className === 'entity-1') {
      tabNeighbord.push(elLeft.id)
    }
    if (elRight !== null && elRight.className === 'entity-1') {
      tabNeighbord.push(elRight.id)
    }
    if (elTop !== null && elTop.className === 'entity-1') {
      tabNeighbord.push(elTop.id)
    }
    if (elBottom !== null && elBottom.className === 'entity-1') {
      tabNeighbord.push(elBottom.id)
    }
    return tabNeighbord
  }

  initBlock() {
    const { world } = this.props // ICI props vienne pas de home ?
    let el

    world.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        el = document.querySelector(`#I${rowIndex}_${colIndex}`)
        switch (el.dataset.value[0]) {
          case 'W':
            el.textContent = 'W'
            break
          case 'X':
            el.textContent = 'X'
            break
          case 'V':
            el.textContent = 'V'
            break
          case 'T':
            el.textContent = 'T'
            break
          case 'Z':
            el.textContent = 'Z'
            break
          case '1':
            el.textContent = 'B'
            break
          case '2':
            el.textContent = 'B'
            break
          case '3':
            el.textContent = 'B'
            break
          case '4':
            el.textContent = 'B'
            break
          default:
            el.textContent = '0'
        }
      })
    })
  }

  playFirstNumber(el) {
    const { dispatch, home } = this.props
    const {
      number,
      player,
      turn
    } = home
    const { firstEnd, turnState } = this.state

    let currentNbTurn = turnState
    let isEnded = firstEnd
    const playerUpdated = player
    let turnUpdated = turn
    console.log('playFirstNumber')
    console.log(turnState)

    if (currentNbTurn.nbTurn === 0) {
      console.log('nbTurn = 0')
      if (number.secondNb === null) {
        console.log('second = null')
        // this.nextPlayer(player)
        this.firstBlockPlayable(null, null)
      } else {
        console.log('second exist')
        isEnded = true
        this.setState({
          firstEnd: isEnded
        })
        this.nextBlockPlayable(el)
      }
    } else {
      console.log('nbTurn != 0')
      currentNbTurn = this.newTurn(number.firstNb)
      this.setState({
        turnState: currentNbTurn
      })
      if (currentNbTurn.nbTurn === 0) {
        console.log('last turn for first')
        isEnded = true
        this.setState({
          firstEnd: isEnded
        })
        if (number.secondNb === null) {
          console.log('second = null')
          // this.nextPlayer(player)
          this.firstBlockPlayable(null, null)
        } else {
          turnUpdated = newTurn(number.secondNb, turn)
          this.firstBlockPlayable(player, turnUpdated.type)
          this.blockDestroy(`entity${playerUpdated}`, undefined)
          dispatch(updateTurn(turnUpdated))
          console.log('turnUpdated in to second')
          console.log(turnUpdated)
          currentNbTurn = turnUpdated
          console.log('ici1')
          this.setState({
            turnState: currentNbTurn
          })
        }
      } else {
        console.log('next turn')
        this.nextBlockPlayable(el)
        this.blockDestroy(`entity${playerUpdated}`, el)
      }
    }
  }

  playSecondNumber(el) {
    const { home } = this.props
    const {
      number,
      player
    } = home
    const { turnState } = this.state
    let currentNbTurn = turnState
    const playerUpdated = player
    console.log('playSecondNumber')
    console.log(turnState)

    if (currentNbTurn.nbTurn === 0) {
      console.log('nbTurn === 0')
      // this.nextPlayer(player)
      this.firstBlockPlayable(null, null)
    } else {
      console.log('nbTurn =! 0')
      currentNbTurn = this.newTurn(number.secondNb)
      this.setState({
        turnState: currentNbTurn
      })
      if (currentNbTurn.nbTurn === 0) {
        console.log('last turn for second')
        // this.nextPlayer(player)
        this.firstBlockPlayable(null, null)
      } else {
        console.log('next turn')
        this.nextBlockPlayable(el)
        this.blockDestroy(`entity${playerUpdated}`, el)
      }
    }
  }

  newTurn(number) {
    const { home, dispatch } = this.props
    const { turn } = home
    const { turnState } = this.state
    let currentNbTurn = turnState
    let turnUpdated = turn

    turnUpdated = newTurn(number, turn)
    turnUpdated.nbTurn -= 1
    dispatch(updateTurn(turnUpdated))
    console.log('turnUpdated')
    console.log(turnUpdated)
    currentNbTurn = turnUpdated
    return currentNbTurn
  }

  nextPlayer(player) {
    const { dispatch } = this.props
    const { firstEnd, turnState } = this.state
    const emptyNumber = {
      first: {
        firstNb: null,
        secondNb: null
      },
      second: {
        firstNb: null,
        secondNb: null
      }
    }
    let playerUpdated = player
    const currentNbTurn = turnState
    let isEnded = firstEnd
    console.log(currentNbTurn)
    console.log('next player')
    isEnded = false
    this.setState({
      firstEnd: isEnded
    })
    newNumber(emptyNumber, false)
    playerUpdated = nextPlayer(player)
    dispatch(updatePlayer(playerUpdated))
    this.firstBlockPlayable(playerUpdated, null)
    this.blockDestroy(`entity${playerUpdated}`, undefined)
    currentNbTurn.type = 'init'
    this.setState({
      turnState: currentNbTurn
    })
    console.log(this.state)
  }

  play(el) {
    const { firstEnd } = this.state
    const isEnded = firstEnd

    if (!isEnded) {
      this.playFirstNumber(el)
    } else {
      this.playSecondNumber(el)
    }
  }

  handleClick(event) {
    const { home } = this.props
    const { player } = home
    const el = event.target
    // console.log(world)
    // ici appel mais sert a rien
    // nextWorld(el.id, world, player)
    this.setBlock(el, player)
    this.play(el)
  }

  render() {
    const { world } = this.props

    return (
      <table id="world">
        <tbody>
          { world.map((row, rowIndex) => (
            <tr key={rowIndex}>
              { row.map((col, colIndex) => (
                <td
                  className="borderTab block"
                  key={`${rowIndex}_${colIndex}`}
                >
                  <div
                    type="button"
                    className={`entity${col}`}
                    data-value={col}
                    id={`I${rowIndex}_${colIndex}`}
                    onClick={(event) => {
                      this.handleClick(event)
                    }
                    }
                  >
                    { col }
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default connect(state => state)(World)
