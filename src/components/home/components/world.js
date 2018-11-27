import React from 'react'
import { connect } from 'react-redux'

class World extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player: props.player,
      number: props.number
    }
  }

  /* setInitilBlock(e) {
    const el = e
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
      default:
        el.style.backgroundColor = 'white'
    }
  } */

  nextPlayer(p) {
    let player = p
    if (player >= 4) {
      player = 1
    } else {
      player += 1
    }

    this.state.player = player
    this.setState({
      player: player * 1
    })
  }

  handleClick(event, player, number) {
    const el = event.target
    const block = el.textContent
    console.log(block)
    console.log(number)
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

    this.nextPlayer(player)
  }

  render() {
    const { land } = this.props
    const { player } = this.state
    const { number } = this.state

    return (
      <table>
        <tbody>
          { land.map((row, rowIndex) => (
            <tr
              key={rowIndex}
            >
              { row.map((col, colIndex) => (
                <td
                  className="borderTab"
                  key={`${rowIndex}/${colIndex}`}
                  id={`${rowIndex}/${colIndex}`}
                  onClick={event => this.handleClick(event, player, number)}
                >
                  { col }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(state) {
  return {
    world: state.world
  }
}

export default connect(mapStateToProps)(World)

