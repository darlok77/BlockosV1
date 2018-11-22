import { Component, React } from 'react'
import { connect } from 'react-redux'

class World extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { world } = this.state
    console.log(world)
    console.log('blaaaaaaa')

    return (
      <table className="list-group">
        { world.map((row, rowIndex) => (

          <tr
            key={rowIndex}
          >
            { row.map((col, colIndex) => (
              <td
                key={`${rowIndex}/${colIndex}`}
              >
                { col }
              </td>
            ))}
          </tr>
        ))}
      </table>
    )
  }
}

export default connect(state => state)(World)

