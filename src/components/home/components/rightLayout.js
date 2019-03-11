import React from 'react'
import { connect } from 'react-redux'

import {
  newNumber,
  newTurn,
  updateTurn,
  newBase
} from '../actions'

class RightLayout extends React.Component {
  constructor(props) {
    super(props)
    const possibility = {
      first: {
        firstNb: null,
        secondNb: null
      },
      second: {
        firstNb: null,
        secondNb: null
      }
    }
    this.state = {
      number: possibility,
      diceRolling: false
    }
  }

  handleClickRoll() {
    const number = this.randomNumber()
    this.setState({
      diceRolling: true,
      number
    })
  }

  handleClickPass() {
    // ici
    const { base } = this.props
    base[1] = 0
    const b = base
    newBase(b)
  }

  handleClickChoice(nbChoice) {
    const { number } = this.state
    const { dispatch, turn } = this.props
    let choice = {}
    let turnUpdated

    this.setState({ diceRolling: false })

    switch (nbChoice) {
      case 1: // triche
        choice = {
          firstNb: number.first[0],
          secondNb: number.first[1]
          /* firstNb: 4,
          secondNb: 6 */
        }
        turnUpdated = newTurn(number.first[0], turn)
        // turnUpdated = newTurn(4, turn)
        break
      case 2:
        choice = {
          firstNb: number.second,
          secondNb: null
        }
        turnUpdated = newTurn(number.second, turn)
        break
      default:
        choice = {
          firstNb: null,
          secondNb: null
        }
    }
    newNumber(choice, true)
    dispatch(updateTurn(turnUpdated))
  }

  randomNumber() {
    let number1 = Math.floor(Math.random() * (7 - 1) + 1)
    let number2 = Math.floor(Math.random() * (7 - 1) + 1)
    const sum = number1 + number2
    if (number1 > number2) {
      number1 += number2
      number2 = number1 - number2
      number1 -= number2
    }
    const possibility = {
      first: [number1, number2]
    }

    if (sum <= 6) {
      possibility.second = sum
    }
    return possibility
  }

  render() {
    const { base } = this.props
    const { diceRolling, number } = this.state
    let choiceLabel
    let choice = 'hidden'
    let choiceSecond = 'hidden'

    if (diceRolling) {
      if (number.second === undefined) {
        choiceLabel = `Vous avez fait ${number.first[0]} et ${number.first[1]}`
        choice = ''
      } else {
        choiceLabel = `Vous avez fait ${number.first[0]} et ${number.first[1]} mais vous pouvez choisir ${number.second}`
        choice = ''
        choiceSecond = ''
      }
    }

    return (
      <div>
        <button type="button" disabled={diceRolling} onClick={this.handleClickRoll.bind(this)}> roll the dice </button>
        <button type="button" hidden={diceRolling} onClick={this.handleClickPass.bind(this)}> pass the number </button>
        <div>
          <p hidden={choice}>{choiceLabel}</p>
          <button type="button" hidden={choice} onClick={() => { this.handleClickChoice(1) }}>
            {`${number.first[0]} et ${number.first[1]}`}
          </button>

          <button type="button" hidden={choiceSecond} onClick={() => { this.handleClickChoice(2) }}>
            {`${number.second}`}
          </button>
        </div>
        <div>
          <p>{`HP Base player 1 : ${base[0]}`}</p>
          <p>{`HP Base player 2 : ${base[1]}`}</p>
          <p>{`HP Base player 3 : ${base[2]}`}</p>
          <p>{`HP Base player 4 : ${base[3]}`}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    turn: state.home.turn,
    dispatch: state.home.dispatch,
    base: state.home.base
  }
)

export default connect(mapStateToProps)(RightLayout)

