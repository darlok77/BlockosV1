import React from 'react'
import { connect } from 'react-redux'

import {
  newNumber,
  newTurn,
  updateTurn
} from '../actions'

/** Class Right Layout */
class RightLayout extends React.Component {
  /**
    * Create a Right Layout.
    * @param {Object} props.
  */
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
      diceRolling: false,
      turn: props.turn
    }
  }

  /**
    * component Will Update.
    * @param {Object} nextProps.
  */
  componentWillUpdate(nextProps) {
    const { turn } = this.state
    if (nextProps.turn !== turn) {
      this.setTurnState(nextProps.turn)
    }
  }

  /**
    * set Turn State.
    * @param {Object} turn.
  */
  setTurnState(turn) {
    this.setState({
      turn
    })
  }

  /**
    * handle Click Roll.
  */
  handleClickRoll() {
    const number = this.randomNumber()
    this.setState({
      diceRolling: true,
      number
    })
  }

  /**
    * handle Click Pass.
  */
  handleClickPass() {
    // ici
    const { number, turn } = this.state
    let turnNumber = JSON.stringify(turn)
    turnNumber = JSON.parse(turnNumber)
    const turnupdated = turn
    turnupdated.nbTurn = 0
    const number1 = newTurn(number.first[0], turnupdated)
    const number2 = newTurn(number.first[1], turnupdated)

    if (turnNumber.nbTurn === number1.nbTurn && turnNumber.type === number1.type) {
      console.log('bla')
      // dispatch(updateTurn(number2))
    } else if (turnNumber.nbTurn === number2.nbTurn && turnNumber.type === number2.type) {
      // dispatch(updateTurn(null))
      console.log('blo')
    }
  }

  /**
    * handle Click Choice.
  */
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

  /**
    * random Number.
    * return {Object} possibility
  */
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

  /**
    * render.
    * return {String}.
  */
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

    const style = {
      B1: {
        width: `${base.B1}0%`
      },
      B2: {
        width: `${base.B2}0%`
      },
      B3: {
        width: `${base.B3}0%`
      },
      B4: {
        width: `${base.B4}0%`
      }
    }

    return (
      <div>
        <div id="divBtn">
          <button type="button" disabled={diceRolling} onClick={this.handleClickRoll.bind(this)}> roll the dice </button>
          <button type="button" hidden={diceRolling} onClick={this.handleClickPass.bind(this)}> pass the number </button>
        </div>
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
          <p>{`HP Base player 1 : ${base.B1}`}</p>
          <div className="bar">
            <div className="percentage has-tip" style={style.B1} data-perc={`${base.B1}0%`} />
          </div>
          <p>{`HP Base player 2 : ${base.B2}`}</p>
          <div className="bar">
            <div className="percentage has-tip" style={style.B2} data-perc={`${base.B2}0%`} />
          </div>
          <p>{`HP Base player 3 : ${base.B3}`}</p>
          <div className="bar">
            <div className="percentage has-tip" style={style.B3} data-perc={`${base.B3}0%`} />
          </div>
          <p>{`HP Base player 4 : ${base.B4}`}</p>
          <div className="bar">
            <div className="percentage has-tip" style={style.B4} data-perc={`${base.B4}0%`} />
          </div>
        </div>
      </div>
    )
  }
}

/**
  * mapStateToProps.
  * @param {Object} state.
  * return {Object}.
*/
const mapStateToProps = state => (
  {
    turn: state.home.turn,
    dispatch: state.home.dispatch,
    base: state.home.base
  }
)

export default connect(mapStateToProps)(RightLayout)

