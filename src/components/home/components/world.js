import React from 'react'
import { connect } from 'react-redux'

import { nextPlayer } from '../actions'

class World extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player: props.player,
      number: props.number
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.initBlock()
    this.blockPlayable(1)
  }

  blockPlayable(player) {
    const { world } = this.props
    let el
    let colorBlock
    console.log(`player dans blockplayable : ${player}`)

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
          // el.style.pointerEvents = 'none'
          el.style.backgroundColor = 'blue'
        } else if (!this.friendlyNeighbor(rowIndex, colIndex, colorBlock)) {
          el.style.pointerEvents = 'none'
          el.style.backgroundColor = 'silver'
        }
      })
    })
    // console.log(`el.textContent : ${el.textContent}`)
    // console.log(`player : ${player}`)
    // console.log(`colorBlock : ${colorBlock}`)
  }

  friendlyNeighbor(x, y, color) {
    // const elPrincipal = document.querySelector(`#I${x}_${y}`)
    const elLeft = document.querySelector(`#I${x}_${y - 1}`)
    const elRight = document.querySelector(`#I${x}_${y + 1}`)
    const elTop = document.querySelector(`#I${x - 1}_${y}`)
    const elBottom = document.querySelector(`#I${x + 1}_${y}`)

    if (elLeft !== null && elLeft.style.backgroundColor === color) {
      return true
    }
    if (elRight !== null && elRight.style.backgroundColor === color) {
      return true
    }
    if (elTop !== null && elTop.style.backgroundColor === color) {
      return true
    }
    if (elBottom !== null && elBottom.style.backgroundColor === color) {
      return true
    }
    return false
  }

  /* nextPlayer(player) {
    let p = player
    if (p >= 4) {
      p = 1
    } else {
      p += 1
    }
    this.blockPlayable(p)

    // this.state.player = p
    this.setState({
      player: p * 1
    })
  } */

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
            el.style.backgroundColor = 'gray'
            break
          case 'Z':
            el.style.backgroundColor = 'purple'
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

  handleClick(event, number) {
    const el = event.target
    const { player } = this.props
    console.log(`number : ${number}`)

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

    nextPlayer(player)
    this.setState({
      player: { player }
    })
    console.log(`player aprés update : ${player}`)
    this.blockPlayable(player)
  }

  render() {
    const { world, player, number } = this.props

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
                      this.handleClick(event, player, number)
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
