import React, { Component } from 'react'
import { connect } from 'react-redux'

import World from './components/world.js'
import RightLayout from './components/rightLayout.js'

class Home extends Component {
  render() {
    const { home } = this.props
    const {
      world,
      player,
      number,
      turn,
      base
    } = home

    return (
      <div>
        <div className="leftLayout">
          <World world={world} player={player} number={number} turn={turn} base={base} />
        </div>
        <div className="rightLayout">
          <RightLayout turn={turn} base={base} />
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Home)
