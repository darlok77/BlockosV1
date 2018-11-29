import React, { Component } from 'react'
import { connect } from 'react-redux'

import World from './components/world.js'
import RightLayout from './components/rightLayout.js'

class Home extends Component {
  render() {
    const { world } = this.props
    const { player } = this.props
    const { number } = this.props

    return (
      <div>
        <div className="leftLayout">
          <World world={world} player={player} number={number} />
        </div>
        <div className="rightLayout">
          <RightLayout />
        </div>
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
