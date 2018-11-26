import React from 'react'
import { connect } from 'react-redux'

class World extends React.Component {
  handleClick(event, player) {
    // event.preventDefault()
    // console.log(event.target)
    console.log(player)

    switch (player) {
      case 1:
        event.target.style.color = 'blue'
        break
      case 2:
        event.target.style.color = 'red'
        break
      case 3:
        event.target.style.color = 'grenn'
        break
      case 4:
        event.target.style.color = 'yellow'
        break
      default:
        event.target.style.color = 'white'
    }
  }

  render() {
    const { land } = this.props
    const { player } = this.props
    console.log(player)

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
                  onClick={event => this.handleClick(event, player)}
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

