import React from 'react'
import { connect } from 'react-redux'

class World extends Component {

  constructor() {
    super()
    this.state = {}
  }

render() {

  let i = 0
  let j = 0

  <table className="list-group">
    { matrix.map(row => (
     { i++ }
      <tr
        key={i}
      >
      { row.map(col => (
      { j++ }
      <td
        key={`${i}/${j}`}
      >
        { col }
      </td>
    ))}
      </tr>
    ))}
  </table>
}

export default connect(state => state)(World)

