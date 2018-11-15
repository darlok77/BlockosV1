import React, { Component } from 'react'
import { connect } from 'react-redux'

import World from './components/world.js'

class Home extends Component {
  render() {
  	const { home } = this.props

    return (
      <div>
        <World matrix={home.matrix} />
      </div>
    )
  }
}

export default connect(state => state)(Home)
