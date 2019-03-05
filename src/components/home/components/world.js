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
    this.firstBlockPlayable(1) // ici component will update si il y a un number mettre celu la a -2
  }

  componentWillUpdate(nextProps) {
    // console.log('componentWillUpdate')
    if (nextProps.number.flag) {
      this.test(nextProps)
    }
  }

  setBlock(el, player) {
    const element = el
    switch (player) {
      case 1:
        element.className = 'entity1'
        element.dataset.value = 1
        break
      case 2:
        element.className = 'entity2'
        element.dataset.value = 2
        break
      case 3:
        element.className = 'entity3'
        element.dataset.value = 3
        break
      case 4:
        element.className = 'entity4'
        element.dataset.value = 4
        break
      default:
        element.className = 'entity0'
        element.dataset.value = 0
    }
  }

  test(nextProps) {
    this.setState({
      turnState: nextProps.turn
    })

    newNumber(nextProps.number, false)
  }

  blockDestroyable(entity) {
    const { world } = this.props // ICI props vienne pas de home ?
    let el = ''

    world.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        el = document.querySelector(`#I${rowIndex}_${colIndex}`)
        el.style.pointerEvents = 'none'
        el.style.opacity = '0.33'
        if (el.className !== entity && (el.textContent === '0' || el.textContent === 'T')) {
          el.style.pointerEvents = 'auto'
          el.style.opacity = '1'
        }
      })
    })
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
    let elem = ''
    let base = ''
    const elPlayable = (element) => {
      const nextBlock = element
      const dataValue = nextBlock.dataset.value
      if (dataValue === '1' || dataValue === '2' || dataValue === '3' || dataValue === '4') {
        // belong to a player
        /* if (dataValue === player.toString(10)) { // not our block
          console.log('======')
          nextBlock.style.pointerEvents = 'auto'
          nextBlock.style.opacity = '1'
        } else */
        if (nextBlock.textContent === 'V' || nextBlock.textContent === 'B') { // is a base or village
          nextBlock.style.pointerEvents = 'auto'
          nextBlock.style.opacity = '1'
        }
      } else if (dataValue !== 'X' && dataValue !== '-1') {
        nextBlock.style.pointerEvents = 'auto'
        nextBlock.style.opacity = '1'
      }
    }

    world.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        elem = document.querySelector(`#I${rowIndex}_${colIndex}`)
        elem.style.pointerEvents = 'none'
        elem.style.opacity = '0.33'
        if (elem.className === el.className && elem.textContent === 'B') {
          base = elem
        }
      })
    })

    if (elLeft !== null && this.friendlyNeighbor(idRow, idCol - 1, el.className)) {
      elPlayable(elLeft)
    }
    if (elRight !== null && this.friendlyNeighbor(idRow, idCol, el.className)) {
      elPlayable(elRight)
    }
    if (elTop !== null && this.friendlyNeighbor(idRow - 1, idCol, el.className)) {
      elPlayable(elTop)
    }
    if (elBottom !== null && this.friendlyNeighbor(idRow + 1, idCol, el.className)) {
      elPlayable(elBottom)
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

  firstBlockPlayable(player) {
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
    this.blockPlayable(entity)
  }

  friendlyNeighbor(x, y, entity) {
    const elLeft = document.querySelector(`#I${x}_${y - 1}`)
    const elRight = document.querySelector(`#I${x}_${y + 1}`)
    const elTop = document.querySelector(`#I${x - 1}_${y}`)
    const elBottom = document.querySelector(`#I${x + 1}_${y}`)

    if (elLeft !== null && (elLeft.className === entity || elLeft.className === 'entity-1')) {
      return true
    }
    if (elRight !== null && (elRight.className === entity || elRight.className === 'entity-1')) {
      return true
    }
    if (elTop !== null && (elTop.className === entity || elTop.className === 'entity-1')) {
      return true
    }
    if (elBottom !== null && (elBottom.className === entity || elBottom.className === 'entity-1')) {
      return true
    }
    return false
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

  play(el) {
    const { dispatch, home } = this.props
    const {
      number,
      player,
      turn
    } = home
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
    let currentNbTurn = turnState
    let isEnded = firstEnd
    let playerUpdated = player
    let turnUpdated = turn

    if (!isEnded) {
      console.log('firstEnd false')
      if (currentNbTurn.nbTurn === 0) {
        console.log('nbTurn = 0')
        if (number.secondNb === null) {
          console.log('second = null')
          isEnded = false
          this.setState({
            firstEnd: isEnded
          })
          console.log('next player')
          newNumber(emptyNumber, false)
          playerUpdated = nextPlayer(player)
          dispatch(updatePlayer(playerUpdated))
          this.firstBlockPlayable(playerUpdated)
          currentNbTurn.type = 'init'
          this.setState({
            turnState: currentNbTurn
          })
        } else {
          console.log('second exist')
          isEnded = true
          this.setState({
            firstEnd: isEnded
          })
        }
      } else {
        console.log('nbTurn != 0')
        turnUpdated = newTurn(number.firstNb, turn)
        turnUpdated.nbTurn -= 1
        dispatch(updateTurn(turnUpdated))
        console.log('turnUpdated first')
        console.log(turnUpdated)
        currentNbTurn = turnUpdated
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
            console.log('next player')
            console.log('second = null')
            isEnded = false
            this.setState({
              firstEnd: isEnded
            })
            newNumber(emptyNumber, false)
            playerUpdated = nextPlayer(player)
            dispatch(updatePlayer(playerUpdated))
            this.firstBlockPlayable(playerUpdated)
            currentNbTurn.type = 'init'
            this.setState({
              turnState: currentNbTurn
            })
          } else {
            this.firstBlockPlayable(player)
            turnUpdated = newTurn(number.secondNb, turn)
            dispatch(updateTurn(turnUpdated))
            console.log('turnUpdated in to second')
            console.log(turnUpdated)
            currentNbTurn = turnUpdated
            this.setState({
              turnState: currentNbTurn
            })
          }
        } else {
          console.log('next turn')
          this.nextBlockPlayable(el)
        }
      }
    } else {
      console.log('firstEnd true')
      if (currentNbTurn.nbTurn === 0) {
        console.log('nbTurn === 0')
        isEnded = false
        this.setState({
          firstEnd: isEnded
        })
        console.log('next player')
        newNumber(emptyNumber, false)
        playerUpdated = nextPlayer(player)
        dispatch(updatePlayer(playerUpdated))
        this.firstBlockPlayable(playerUpdated)
        currentNbTurn.type = 'init'
        this.setState({
          turnState: currentNbTurn
        })
      } else {
        console.log('nbTurn =! 0')
        turnUpdated = newTurn(number.secondNb, turn)
        turnUpdated.nbTurn -= 1
        dispatch(updateTurn(turnUpdated))
        console.log('turnUpdated second')
        console.log(turnUpdated)
        currentNbTurn = turnUpdated
        this.setState({
          turnState: currentNbTurn
        })
        if (currentNbTurn.nbTurn === 0) {
          console.log('last turn for second')
          isEnded = true
          this.setState({
            firstEnd: isEnded
          })
          console.log('next player')
          isEnded = false
          this.setState({
            firstEnd: isEnded
          })
          newNumber(emptyNumber, false)
          playerUpdated = nextPlayer(player)
          dispatch(updatePlayer(playerUpdated))
          this.firstBlockPlayable(playerUpdated)
          currentNbTurn.type = 'init'
          this.setState({
            turnState: currentNbTurn
          })
        } else {
          console.log('next turn')
          this.nextBlockPlayable(el)
        }
      }
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
