import React from 'react'
import { connect } from 'react-redux'

import { nextPlayer, nextWorld, newTurn } from '../actions'

class World extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player: props.player,
      number: props.number,
      world: props.world,
      turn: props.turn,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.initBlock()
    this.firstBlockPlayable(1)
  }

  nextBlockPlayable(number) {
    console.log(number)
  }

  blockPlayable(el) {
    const id = el.id
    const parseId = id.split('_', 2)
    const idRow = parseInt(parseId[0].substr(1), 10)
    const idCol = parseInt(parseId[1], 10)

    if (this.friendlyNeighbor(idRow, idCol, el.style.backgroundColor)) {
      el.style.pointerEvents = 'auto'
      el.style.opacity = "1"
    }

  }

  firstBlockPlayable(player) {
    const { world } = this.props
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
        colorBlock = 'white'
    }

    world.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        el = document.querySelector(`#I${rowIndex}_${colIndex}`)

        if (el.textContent === player.toString()) {
          element = el
          el.style.pointerEvents = 'none'
          el.style.opacity = "0.33"
        } else if (!this.friendlyNeighbor(rowIndex, colIndex, colorBlock)) {
          el.style.pointerEvents = 'none'
          el.style.opacity = "0.33"
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
    const { player, world, number } = this.props
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
    //console.log(number)
    //newTurn(number)

   
    // console.log(`player avant update : ${player}`)

    nextPlayer(player)
    // console.log('state.player aprés next : ')
    // console.log({ player })
    // console.log(this.props)
    /* this.setState({
      player: { player }
    }) */
    console.log(`player aprés update : ${player}`)
    const element = this.firstBlockPlayable(player)
    // this.continueTurn(element)
    // this.blockPlayable(element)
  }

  render() {
    const { world, player, number } = this.props
    // console.log(typeof world)
    // console.log(world)

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
