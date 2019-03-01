import React from 'react'
import { connect } from 'react-redux'

import {
  /* nextWorld, */
  newTurn,
  nextPlayer,
  newNumber,
  updatePlayer,
  updateTurn
} from '../actions'

class World extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      world: props.world,
      turnState: props.turn,
      firstEnd: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.initBlock()
    this.firstBlockPlayable(1) // component will update si il y a un number mettre celu la a 0
  }

  componentWillUpdate(nextProps) {
    // console.log('componentWillUpdate')
    /* console.log(this.props)
    console.log(nextProps)
    console.log(nextProps.number) */
    // console.log(nextProps.number.flag)
    if (nextProps.number.flag) {
      // ICI sate = props de turn
      console.log('iciii')
      this.test(nextProps)
    }
  }

  setBlock(el, player) {
    const element = el
    switch (player) {
      case 1:
        element.style.backgroundColor = 'blue'
        element.textContent = 1
        break
      case 2:
        element.style.backgroundColor = 'red'
        element.textContent = 2
        break
      case 3:
        element.style.backgroundColor = 'green'
        element.textContent = 3
        break
      case 4:
        element.style.backgroundColor = 'yellow'
        element.textContent = 4
        break
      default:
        element.style.backgroundColor = 'white'
    }
  }

  test(nextProps) {
    this.setState({
      turnState: nextProps.turn
    })
    /* console.log(this.props)
    console.log(nextProps)
    console.log(this.state) */
    console.log(nextProps.number)
    newNumber(nextProps.number, false)
  }

  blockPlayable(el) {
    const { world } = this.props // ICI props vienne pas de home ?
    const element = el
    const elId = element.id
    const parseId = elId.split('_', 2)
    const idRow = parseInt(parseId[0].substr(1), 10)
    const idCol = parseInt(parseId[1], 10)
    let elem = ''

    world.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        elem = document.querySelector(`#I${rowIndex}_${colIndex}`)
        elem.style.pointerEvents = 'none'
        elem.style.opacity = '0.33'
      })
    })
    if (this.friendlyNeighbor(idRow, idCol - 1, el.style.backgroundColor)) {
      const elLeft = document.querySelector(`#I${idRow}_${idCol - 1}`)
      elLeft.style.pointerEvents = 'auto'
      elLeft.style.opacity = '1'
    }
    if (this.friendlyNeighbor(idRow, idCol, el.style.backgroundColor)) {
      const elRight = document.querySelector(`#I${idRow}_${idCol + 1}`)
      elRight.style.pointerEvents = 'auto'
      elRight.style.opacity = '1'
    }
    if (this.friendlyNeighbor(idRow - 1, idCol, el.style.backgroundColor)) {
      const elTop = document.querySelector(`#I${idRow - 1}_${idCol}`)
      elTop.style.pointerEvents = 'auto'
      elTop.style.opacity = '1'
    }
    if (this.friendlyNeighbor(idRow + 1, idCol, el.style.backgroundColor)) {
      const elBottom = document.querySelector(`#I${idRow + 1}_${idCol}`)
      elBottom.style.pointerEvents = 'auto'
      elBottom.style.opacity = '1'
    }
  }

  firstBlockPlayable(player) {
    const { world, turn } = this.props // ICI props vienne pas de home ?
    let el
    let colorBlock
    let element

    switch (player) {
      case 1:
        colorBlock = 'blue'
        break
      case 2:
        colorBlock = 'red'
        break
      case 3:
        colorBlock = 'green'
        break
      case 4:
        colorBlock = 'yellow'
        break
      default:
        colorBlock = 'AliceBlue'
    }

    console.log(`turn = ${turn.nbTurn}`) // ICI turn reste a 0 consequence if apres
    console.log(`player = ${player}`)

    world.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        el = document.querySelector(`#I${rowIndex}_${colIndex}`)
        el.style.pointerEvents = 'auto'
        el.style.opacity = '1'

        if (this.friendlyNeighbor(rowIndex, colIndex, colorBlock) && turn.nbTurn !== 0) {
          el.style.pointerEvents = 'none'
          el.style.opacity = '0.33'
        }
        if (el.textContent === player.toString()) {
          element = el
          el.style.pointerEvents = 'none'
          el.style.opacity = '0.33'
        } else if (!this.friendlyNeighbor(rowIndex, colIndex, colorBlock)) {
          el.style.pointerEvents = 'none'
          el.style.opacity = '0.33'
        }
      })
    })
    return element
  }

  friendlyNeighbor(x, y, color) {
    const elLeft = document.querySelector(`#I${x}_${y - 1}`)
    const elRight = document.querySelector(`#I${x}_${y + 1}`)
    const elTop = document.querySelector(`#I${x - 1}_${y}`)
    const elBottom = document.querySelector(`#I${x + 1}_${y}`)

    if (elLeft !== null && (elLeft.style.backgroundColor === color)) {
      return true
    }
    if (elRight !== null && (elRight.style.backgroundColor === color)) {
      return true
    }
    if (elTop !== null && (elTop.style.backgroundColor === color)) {
      return true
    }
    if (elBottom !== null && (elBottom.style.backgroundColor === color)) {
      return true
    }
    return false
  }

  initBlock() {
    const { world } = this.props // ICI props vienne pas de home ?
    let el

    world.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        el = document.querySelector(`#I${rowIndex}_${colIndex}`)
        switch (el.textContent[0]) {
          case 'W':
            el.style.backgroundColor = 'aqua'
            break
          case 'X':
            el.style.backgroundColor = 'black'
            break
          case 'V':
            el.style.backgroundColor = 'lime'
            break
          case 'T':
            el.style.backgroundColor = 'Purple'
            break
          case 'Z':
            el.style.backgroundColor = 'BlueViolet'
            break
          case '1':
            el.style.backgroundColor = 'blue'
            break
          case '2':
            el.style.backgroundColor = 'red'
            break
          case '3':
            el.style.backgroundColor = 'green'
            break
          case '4':
            el.style.backgroundColor = 'yellow'
            break
          default:
            el.style.backgroundColor = 'white'
        }
      })
    })
  }

  handleClick(event) {
    const el = event.target
    const { dispatch, home } = this.props
    const {
      number,
      player,
      turn
    } = home
    const { firstEnd, turnState } = this.state
    let currentNbTurn = turnState
    let isEnded = firstEnd
    let playerUpdated = player
    let turnUpdated = turn
    // console.log(world)
    // ici appel mais sert a rien
    // nextWorld(el.id, world, player)
    this.setBlock(el, player)
    console.log('bla')
    console.log(number)
    if (!isEnded) {
      console.log('firstEnd false')
      // ICI prio 2eme joueur jou sur plusieur tour , turn = 0
      if (currentNbTurn.nbTurn === 0) {
        console.log('nbTurn = 0')
        if (number.secondNb === null) {
          console.log('second = null')
          isEnded = false
          this.setState({
            firstEnd: isEnded
          })
          console.log('next player')
          newNumber(undefined, false)
          playerUpdated = nextPlayer(player)
          dispatch(updatePlayer(playerUpdated))
          this.firstBlockPlayable(playerUpdated)
          currentNbTurn.type = 'init'
          this.setState({
            turnState: currentNbTurn
          })
        } else {
          console.log('second exist')
          isEnded = true
          this.setState({
            firstEnd: isEnded
          })
        }
      } else {
        console.log('nbTurn != 0')
        turnUpdated = newTurn(number.firstNb, turn)
        turnUpdated.nbTurn -= 1
        dispatch(updateTurn(turnUpdated))
        console.log('turnUpdated first')
        console.log(turnUpdated)
        currentNbTurn = turnUpdated
        this.setState({
          turnState: currentNbTurn
        })
        if (currentNbTurn.nbTurn === 0) {
          console.log('last turn for first')
          isEnded = true
          this.setState({
            firstEnd: isEnded
          })
          if (number.secondNb === null) {
            console.log('next player')
            console.log('second = null')
            isEnded = false
            this.setState({
              firstEnd: isEnded
            })
            newNumber(undefined, false)
            playerUpdated = nextPlayer(player)
            dispatch(updatePlayer(playerUpdated))
            this.firstBlockPlayable(playerUpdated)
            currentNbTurn.type = 'init'
            this.setState({
              turnState: currentNbTurn
            })
          } else {
            this.firstBlockPlayable(player)
          }
        } else {
          console.log('next turn')
          this.blockPlayable(el)
        }
      }
    } else {
      console.log('firstEnd true')
      if (currentNbTurn.nbTurn === 0) {
        console.log('nbTurn === 0')
        isEnded = false
        this.setState({
          firstEnd: isEnded
        })
        console.log('next player')
        newNumber(undefined, false)
        playerUpdated = nextPlayer(player)
        dispatch(updatePlayer(playerUpdated))
        this.firstBlockPlayable(playerUpdated)
        currentNbTurn.type = 'init'
        this.setState({
          turnState: currentNbTurn
        })
      } else {
        console.log('nbTurn =! 0')
        turnUpdated = newTurn(number.secondNb, turn)
        turnUpdated.nbTurn -= 1
        dispatch(updateTurn(turnUpdated))
        console.log('turnUpdated second')
        console.log(turnUpdated)
        currentNbTurn = turnUpdated
        this.setState({
          turnState: currentNbTurn
        })
      }
    }

    /* // NEW TURN
    if (!firstEnd || number.secondNb === null) {
      turnUpdated = newTurn(number.firstNb, turn)
      dispatch(updateTurn(turnUpdated))
      console.log('turnUpdated first')
      console.log(turnUpdated)
    } else {
      turnUpdated = newTurn(number.secondNb, turn)
      dispatch(updateTurn(turnUpdated))
      console.log('turnUpdated second')
      console.log(turnUpdated)
    }

    if (turnUpdated.nbTurn === 0) { // TURN END
      await console.log(firstEnd)
      console.log(number)
      if (await firstEnd) { // nombre 1 fini
        console.log('1 fini')
        if (number.secondNb === null) { // second Number null
          console.log('2 null')
          this.setState({
            firstEnd: false
          })
          console.log('next player')
          newNumber(undefined)

          playerUpdated = nextPlayer(player)
          dispatch(updatePlayer(playerUpdated))
          this.firstBlockPlayable(playerUpdated)
          await console.log('firstEnd false')
          await console.log(firstEnd)
        } else { // second number exist
          console.log('2 exist')
          this.setState({
            firstEnd: true
          })
          await console.log('firstEnd true1')
          await console.log(firstEnd)
        }
      } else { // nombre 1 pas fini
        console.log('1 pas fini')
        isEnded = true
        this.setState({
          firstEnd: isEnded
        })
        await console.log('firstEnd true2')
        await console.log(isEnded)
      }
    } else { // NEXT TURN
      console.log('next turn')
      console.log(number)
      // this.firstBlockPlayable(player)
      // this.continueTurn(element)
      this.blockPlayable(el)
    } */
  }

  render() {
    const { world } = this.props

    return (
      <table id="world">
        <tbody>
          { world.map((row, rowIndex) => (
            <tr key={rowIndex}>
              { row.map((col, colIndex) => (
                <td
                  className="borderTab"
                  key={`${rowIndex}_${colIndex}`}
                >
                  <div
                    type="button"
                    id={`I${rowIndex}_${colIndex}`}
                    onClick={(event) => {
                      this.handleClick(event)
                    }
                    }
                  >
                    { col }
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default connect(state => state)(World)
