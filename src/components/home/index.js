import React, { Component } from 'react'
import { connect } from 'react-redux'

import World from './components/world.js'

class Home extends Component {
  render() {
    const { world } = this.props
    const { player } = this.props

    return (
      <div>
        <World land={world} player={player} />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    world: state.home.world,
    player: state.home.player,
    number: state.home.number
  }
}

export default connect(mapStateToProps)(Home)
