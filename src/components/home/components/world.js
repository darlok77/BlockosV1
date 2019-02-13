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
      player: props.player,
      number: props.number,
      world: props.world,
      turn: props.turn,
      firstEnd: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.initBlock()
    this.firstBlockPlayable(1) // component will update si il y a un number mettre celu la a 0
  }

  setBlock(el, player) {
    const element = el
    switch (player) {
      case 1:
        element.style.backgroundColor = 'blue'
        element.textContent = 1
        break
      case 2:
        element.style.backgroundColor = 'red'
        element.textContent = 2
        break
      case 3:
        element.style.backgroundColor = 'green'
        element.textContent = 3
        break
      case 4:
        element.style.backgroundColor = 'yellow'
        element.textContent = 4
        break
      default:
        element.style.backgroundColor = 'white'
    }
  }

  blockPlayable(el) {
    const { world } = this.props
    const element = el
    const elId = element.id
    const parseId = elId.split('_', 2)
    const idRow = parseInt(parseId[0].substr(1), 10)
    const idCol = parseInt(parseId[1], 10)
    let elem = ''

    world.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        elem = document.querySelector(`#I${rowIndex}_${colIndex}`)
        elem.style.pointerEvents = 'none'
        elem.style.opacity = '0.33'
      })
    })
    if (this.friendlyNeighbor(idRow, idCol - 1, el.style.backgroundColor)) {
      const elLeft = document.querySelector(`#I${idRow}_${idCol - 1}`)
      elLeft.style.pointerEvents = 'auto'
      elLeft.style.opacity = '1'
    }
    if (this.friendlyNeighbor(idRow, idCol, el.style.backgroundColor)) {
      const elRight = document.querySelector(`#I${idRow}_${idCol + 1}`)
      elRight.style.pointerEvents = 'auto'
      elRight.style.opacity = '1'
    }
    if (this.friendlyNeighbor(idRow - 1, idCol, el.style.backgroundColor)) {
      const elTop = document.querySelector(`#I${idRow - 1}_${idCol}`)
      elTop.style.pointerEvents = 'auto'
      elTop.style.opacity = '1'
    }
    if (this.friendlyNeighbor(idRow + 1, idCol, el.style.backgroundColor)) {
      const elBottom = document.querySelector(`#I${idRow + 1}_${idCol}`)
      elBottom.style.pointerEvents = 'auto'
      elBottom.style.opacity = '1'
    }
  }

  firstBlockPlayable(player) {
    const { world, turn } = this.props
    let el
    let colorBlock
    let element

    switch (player) {
      case 1:
        colorBlock = 'blue'
        break
      case 2:
        colorBlock = 'red'
        break
      case 3:
        colorBlock = 'green'
        break
      case 4:
        colorBlock = 'yellow'
        break
      default:
        colorBlock = 'AliceBlue'
    }

    console.log(`turn = ${turn.nbTurn}`) // ICI turn reste a 0 consequence if apres
    console.log(`player = ${player}`)

    world.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        el = document.querySelector(`#I${rowIndex}_${colIndex}`)
        el.style.pointerEvents = 'auto'
        el.style.opacity = '1'

        if (this.friendlyNeighbor(rowIndex, colIndex, colorBlock) && turn.nbTurn !== 0) {
          el.style.pointerEvents = 'none'
          el.style.opacity = '0.33'
        }
        if (el.textContent === player.toString()) {
          element = el
          el.style.pointerEvents = 'none'
          el.style.opacity = '0.33'
        } else if (!this.friendlyNeighbor(rowIndex, colIndex, colorBlock)) {
          el.style.pointerEvents = 'none'
          el.style.opacity = '0.33'
        }
      })
    })
    return element
  }

  friendlyNeighbor(x, y, color) {
    const elLeft = document.querySelector(`#I${x}_${y - 1}`)
    const elRight = document.querySelector(`#I${x}_${y + 1}`)
    const elTop = document.querySelector(`#I${x - 1}_${y}`)
    const elBottom = document.querySelector(`#I${x + 1}_${y}`)

    if (elLeft !== null && (elLeft.style.backgroundColor === color || elLeft.style.backgroundColor === 'gray')) {
      return true
    }
    if (elRight !== null && (elRight.style.backgroundColor === color || elRight.style.backgroundColor === 'gray')) {
      return true
    }
    if (elTop !== null && (elTop.style.backgroundColor === color || elTop.style.backgroundColor === 'gray')) {
      return true
    }
    if (elBottom !== null && (elBottom.style.backgroundColor === color || elBottom.style.backgroundColor === 'gray')) {
      return true
    }
    return false
  }

  initBlock() {
    const { world } = this.props
    let el

    world.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        el = document.querySelector(`#I${rowIndex}_${colIndex}`)
        switch (el.textContent[0]) {
          case 'W':
            el.style.backgroundColor = 'aqua'
            break
          case 'X':
            el.style.backgroundColor = 'black'
            break
          case 'V':
            el.style.backgroundColor = 'lime'
            break
          case 'T':
            el.style.backgroundColor = 'Purple'
            break
          case 'Z':
            el.style.backgroundColor = 'BlueViolet'
            break
          case '1':
            el.style.backgroundColor = 'blue'
            break
          case '2':
            el.style.backgroundColor = 'red'
            break
          case '3':
            el.style.backgroundColor = 'green'
            break
          case '4':
            el.style.backgroundColor = 'yellow'
            break
          default:
            el.style.backgroundColor = 'white'
        }
      })
    })
  }

  async handleClick(event) {
    const el = event.target
    const { dispatch, home } = this.props
    const {
      number,
      player,
      turn
    } = home
    const { firstEnd } = this.state
    let playerUpdated = player
    let turnUpdated = turn
    // console.log(world)
    // ici appel mais sert a rien
    // nextWorld(el.id, world, player)
    this.setBlock(el, player)

    // NEW TURN
    if (!firstEnd || number.number.secondNb === null) {
      turnUpdated = newTurn(number.number.firstNb, turn)
      dispatch(updateTurn(turnUpdated))
      console.log('turnUpdated first')
      console.log(turnUpdated)
    } else {
      turnUpdated = newTurn(number.number.secondNb, turn)
      dispatch(updateTurn(turnUpdated))
      console.log('turnUpdated second')
      console.log(turnUpdated)
    }

    if (turnUpdated.nbTurn === 0) { // TURN END
      await console.log(firstEnd)
      console.log(number)
      if (await firstEnd) { // nombre 1 fini
        console.log('1 fini')
        if (number.number.secondNb === null) { // second Number null
          console.log('2 null')
          this.setState({
            firstEnd: false
          })
          console.log('next player')
          newNumber(undefined)

          playerUpdated = nextPlayer(player)
          dispatch(updatePlayer(playerUpdated))
          this.firstBlockPlayable(playerUpdated)
          await console.log('firstEnd false')
          await console.log(firstEnd)
        } else { // second number exist
          console.log('2 exist')
          this.setState({
            firstEnd: true
          })
          await console.log('firstEnd true1')
          await console.log(firstEnd)
        }
      } else { // nombre 1 pas fini
        console.log('1 pas fini')
        this.setState({
          firstEnd: true
        })
        await console.log('firstEnd true2')
        await console.log(firstEnd)
      }
    } else { // NEXT TURN
      console.log('next turn')
      console.log(number)
      // this.firstBlockPlayable(player)
      // this.continueTurn(element)
      this.blockPlayable(el)
    }
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
                  className="borderTab"
                  key={`${rowIndex}_${colIndex}`}
                >
                  <div
                    type="button"
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
