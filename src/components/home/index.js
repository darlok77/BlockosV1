import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { nextPlayer } from './actions'

import World from './components/world.js'
import RightLayout from './components/rightLayout.js'

class Home extends Component {
  render() {
    const { home } = this.props
    const {
      world,
      player,
      number,
      turn
    } = home

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

export default connect(state => state)(Home)
