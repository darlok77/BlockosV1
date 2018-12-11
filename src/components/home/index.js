import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { nextPlayer } from './actions'

import World from './components/world.js'
import RightLayout from './components/rightLayout.js'

class Home extends Component {
  render() {
    const {
      world,
      player,
      number,
      turn
    } = this.props

    return (
      <div>
        <div className="leftLayout">
          <World world={world} player={player} number={number} turn={turn} />
        </div>
        <div className="rightLayout">
          <RightLayout number={number} />
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    world: state.home.world,
    player: state.home.player,
    number: state.home.number,
    turn: state.home.turn
  }
}

export default connect(mapStateToProps)(Home)
