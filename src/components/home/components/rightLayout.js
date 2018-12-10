import React from 'react'
import { connect } from 'react-redux'

import { newNumber } from '../actions'

class RightLayout extends React.Component {
  constructor(props) {
    super(props)
    const possibility = {
      first: [3, 2],
      second: 5
    }
    this.state = {
      number: possibility,
      diceRolling: true
    }
  }

  handleClick() {
    this.setState({ diceRolling: false })
  }

  handleClickChoice(nbChoice) {
    const { number } = this.state
    let choice

    this.setState({ diceRolling: true })

    switch (nbChoice) {
      case 1:
        choice = number.first
        break
      case 2:
        choice = number.second
        break
      default:
        choice = number.first
    }
    newNumber(choice)
  }

  randomNumber() {
    const number1 = Math.floor(Math.random() * (7 - 1) + 1)
    const number2 = Math.floor(Math.random() * (7 - 1) + 1)
    const sum = number1 + number2
    const possibility = {
      first: [number1, number2]
    }

    if (sum <= 6) {
      possibility.second = sum
    }
    return possibility
  }

  render() {
    const { diceRolling, number } = this.state
    let choiceLabel
    let choice = 'hidden'

    if (!diceRolling) {
      if (number.second === undefined) {
        choiceLabel = `Vous avez fait ${number.first[0]} et ${number.first[1]}`
      } else {
        choiceLabel = `Vous avez fait ${number.first[0]} et ${number.first[1]} mais vous pouvez choisir ${number.second}`
        choice = ''
      }
    }

    return (
      <div>
        <button type="button" disabled={!diceRolling} onClick={this.handleClick.bind(this)}> roll the dice </button>
        <div>
          <p hidden={choice}>{choiceLabel}</p>
          <button type="button" hidden={choice} onClick={() => { this.handleClickChoice(1) }}>
            {`${number.first[0]} et ${number.first[1]}`}
          </button>

          <button type="button" hidden={choice} onClick={() => { this.handleClickChoice(2) }}>
            {`${number.second}`}
          </button>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(RightLayout)

