import React from 'react'
import { connect } from 'react-redux'

import { nextWorld, newTurn /* nextPlayer */ } from '../actions'

class World extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player: props.player,
      number: props.number,
      world: props.world,
      turn: props.turn
    }
    this.handleClick = this.handleClick.bind(this)
    this.firstNb = {}
    this.secondNb = {}
  }

  componentDidMount() {
    this.initBlock()
    this.firstBlockPlayable(1)
  }

  componentWillUpdate(nextProps, nextState) {
    const { open } = this.state
    // this.setNumber()

    if (nextState.open === true && open === false) {
      console.log('rhaaaaaaaa')
    }
  }

  setNumber() {
    const { number } = this.props
    if (number.first !== undefined) {
      const [first, second] = number.first

      if (number.first === undefined) {
        this.firstNb = first
      } else {
        this.secondNb = second
      }
    }
  }

  blockPlayable(el) {
    const element = el
    const elId = element.id
    const parseId = elId.split('_', 2)
    const idRow = parseInt(parseId[0].substr(1), 10)
    const idCol = parseInt(parseId[1], 10)
    console.log(el)

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
    console.log(turn.nbTurn)
    let el
    let colorBlock
    let element
    console.log('player dans firstBlockPlayable : ')
    console.log(player)

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

    world.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        el = document.querySelector(`#I${rowIndex}_${colIndex}`)

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

  handleClick(event) {
    const el = event.target
    const {
      player,
      world,
      turn
    } = this.props

    // console.log(world)

    nextWorld(el.id, world, player)
    switch (player) {
      case 1:
        el.style.backgroundColor = 'blue'
        el.textContent = 1
        break
      case 2:
        el.style.backgroundColor = 'red'
        el.textContent = 2
        break
      case 3:
        el.style.backgroundColor = 'green'
        el.textContent = 3
        break
      case 4:
        el.style.backgroundColor = 'yellow'
        el.textContent = 4
        break
      default:
        el.style.backgroundColor = 'white'
    }
    console.log('ici')
    console.log(this.firstNb)
    newTurn(this.firstNb)
    this.setState({
      turn: { turn }
    })
    // console.log(turn)
    // ICI state turn non actualisé

    // console.log(`player avant update : ${player}`)

    // nextPlayer(player)
    // console.log('state.player aprés next : ')
    // console.log({ player })
    // console.log(this.props)
    // console.log(this.state)
    this.setState({
      player: { player }
    })
    // ICI state player non actualisé
    console.log(`player aprés update : ${player}`)
    const element = this.firstBlockPlayable(player)
    // this.continueTurn(element)
    this.blockPlayable(element)
  }

  render() {
    const { world/* , number, player */ } = this.props
    console.log(typeof world)
    // console.log(world)

    /* if (number.number !== undefined) {
      console.log('bla')
      this.firstBlockPlayable(player)
    } */
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
