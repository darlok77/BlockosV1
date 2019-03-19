import React from 'react'
import { connect } from 'react-redux'

import {
  /* nextWorld, */
  newTurn,
  nextPlayer,
  newNumber,
  updatePlayer,
  updateTurn,
  newBase
} from '../actions'

/** Class World */
class World extends React.Component {
  /**
    * Create a world.
    * @param {Object} props.
  */
  constructor(props) {
    super(props)
    this.state = {
      world: props.world,
      turnState: props.turn,
      firstEnd: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  /**
    * component Did Mount.
  */
  componentDidMount() {
    this.initBlock()
    this.firstBlockPlayable(null, null)
  }

  /**
    * component Will Update.
    * @param {Object} nextProps.
  */
  componentWillUpdate(nextProps) {
    if (nextProps.number !== undefined) {
      if (nextProps.number.flag) {
        this.newPlayerTurn(nextProps)
      }
    }
  }

  /**
    * set Block.
    * @param {Element} el.
    * @param {Number} player.
  */
  setBlock(el, player) {
    const element = el
    const { turn, base } = this.props
    const entity0 = 'entity0'
    const entity1 = 'entity1'
    const entity2 = 'entity2'
    const entity3 = 'entity3'
    const entity4 = 'entity4'
    const dataValue = el.dataset.value

    if (el.textContent === 'B') {
      const baseUpdate = newBase(dataValue, base)
      this.checkVictory(baseUpdate)
    } else {
      switch (player) {
        case 1:
          element.className = entity1
          element.dataset.value = 1
          this.blockDestroy(entity1, undefined, turn.type)
          break
        case 2:
          element.className = entity2
          element.dataset.value = 2
          this.blockDestroy(entity2, undefined, turn.type)
          break
        case 3:
          element.className = entity3
          element.dataset.value = 3
          this.blockDestroy(entity3, undefined, turn.type)
          break
        case 4:
          element.className = entity4
          element.dataset.value = 4
          this.blockDestroy(entity4, undefined, turn.type)
          break
        default:
          element.className = entity0
          element.dataset.value = 0
          this.blockDestroy(entity0, undefined, turn.type)
      }
      if (turn.type === 'destroy') {
        element.className = 'entity-1'
        element.dataset.value = -1
        element.style.backgroundImage = 'url("/asset/image/guillaume-04.png")'
      }
    }
  }

  /**
    * set Playable After Destroy.
    * @param {Number} x.
    * @param {Number} y.
    * @param {String} type.
  */
  setPlayableAfterDestroy(x, y, type) {
    const el = document.querySelector(`#I${x}_${y}`)
    const elLeft = document.querySelector(`#I${x}_${y - 1}`)
    const elRight = document.querySelector(`#I${x}_${y + 1}`)
    const elTop = document.querySelector(`#I${x - 1}_${y}`)
    const elBottom = document.querySelector(`#I${x + 1}_${y}`)
    let dataValue = el.dataset.value

    if (type === 'att' && dataValue === '-1') {
      if (elLeft !== null) {
        dataValue = elLeft.dataset.value
        if (dataValue !== 0) { // wtf
          this.elPlayable(elLeft)
        }
      }
      if (elRight !== null) {
        dataValue = elRight.dataset.value
        if (dataValue !== 0) {
          this.elPlayable(elRight)
        }
      }
      if (elTop !== null) {
        dataValue = elTop.dataset.value
        if (dataValue !== 0) {
          this.elPlayable(elTop)
        }
      }
      if (elBottom !== null) {
        dataValue = elBottom.dataset.value
        if (dataValue !== 0) {
          this.elPlayable(elBottom)
        }
      }
    }
  }

  /**
    * check Victory.
    * @param {Object} base.
  */
  checkVictory(base) {
    const { player } = this.props
    let cpt = 0
    Object.keys(base).map((bPlayer) => {
      if (base[bPlayer] === 0) {
        cpt += 1
      }
      return ''
    })
    if (cpt === 3) {
      alert(`player ${player} WIN`)
    }
  }

  /**
    * parse Element To Id.
    * @param {Element} el.
    * return {Array<String>} ids
  */
  parseElementToId(el) {
    const elId = el.id
    const parseId = elId.split('_', 2)
    const idRow = parseInt(parseId[0].substr(1), 10)
    const idCol = parseInt(parseId[1], 10)
    const ids = [idRow, idCol]

    return ids
  }

  /**
    * next Block Playable.
    * @param {Element} el.
    * @param {String} type.
  */
  nextBlockPlayable(el, type) {
    const { world } = this.props
    const elId = this.parseElementToId(el)
    const elLeft = document.querySelector(`#I${elId[0]}_${elId[1] - 1}`)
    const elRight = document.querySelector(`#I${elId[0]}_${elId[1] + 1}`)
    const elTop = document.querySelector(`#I${elId[0] - 1}_${elId[1]}`)
    const elBottom = document.querySelector(`#I${elId[0] + 1}_${elId[1]}`)
    let element = ''
    let base = ''

    world.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        element = document.querySelector(`#I${rowIndex}_${colIndex}`)
        element.style.pointerEvents = 'none'
        element.style.filter = 'grayscale(50%)'
        // element.style.opacity = '0.33'
        if (element.className === el.className && element.textContent === 'B') {
          base = element
        }
      })
    })
    if (elLeft !== null && this.friendlyNeighbor(elId[0], elId[1] - 1, el.className)) {
      this.elPlayable(elLeft)
    }
    if (elRight !== null && this.friendlyNeighbor(elId[0], elId[1] + 1, el.className)) {
      this.elPlayable(elRight)
    }
    if (elTop !== null && this.friendlyNeighbor(elId[0] - 1, elId[1], el.className)) {
      this.elPlayable(elTop)
    }
    if (elBottom !== null && this.friendlyNeighbor(elId[0] + 1, elId[1], el.className)) {
      this.elPlayable(elBottom)
    }
    if (type !== 'att') {
      base.style.pointerEvents = 'none'
      base.style.filter = 'grayscale(50%)'
      // base.style.opacity = '0.33'
    }
  }

  /**
    * block Playable.
    * @param {String} entity.
    * @param {String} type.
  */
  blockPlayable(entity, type) {
    const { world } = this.props
    let el
    let dataValue

    world.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        el = document.querySelector(`#I${rowIndex}_${colIndex}`)
        dataValue = el.dataset.value
        el.style.pointerEvents = 'none'
        // el.style.opacity = '0.33'
        el.style.filter = 'grayscale(50%)'

        /* if (this.friendlyNeighbor(rowIndex, colIndex, entity) && turn.nbTurn !== 0) {
          el.style.pointerEvents = 'none'
          el.style.opacity = '0.33'
        } */

        if (this.friendlyNeighbor(rowIndex, colIndex, entity)) { // have a neighbord
          if (dataValue === '1' || dataValue === '2' || dataValue === '3' || dataValue === '4') {
            // belong to a player
            /* if (dataValue === entity.substr(6)) { // our block
              el.style.pointerEvents = 'none'
              el.style.opacity = '0.33'
            } */

            if (type === 'att' && (el.textContent === 'V' || el.textContent === 'B')) { // is a base or village
              el.style.pointerEvents = 'auto'
              // el.style.opacity = '1'
              el.style.filter = 'grayscale(0%)'
            }
          } else if (dataValue === '0') {
            el.style.pointerEvents = 'auto'
            // el.style.opacity = '1'
            el.style.filter = 'grayscale(0%)'
          }
        }
      })
    })
  }

  /**
     * first Block Playable.
     * @param {Number} player.
     * @param {String} type.
  */
  firstBlockPlayable(player, type) {
    let entity

    switch (player) {
      case 1:
        entity = 'entity1'
        break
      case 2:
        entity = 'entity2'
        break
      case 3:
        entity = 'entity3'
        break
      case 4:
        entity = 'entity4'
        break
      default:
        entity = 'entityA'
    }

    if (type !== 'destroy') {
      this.blockPlayable(entity, type)
    } else {
      this.blockDestroyable(entity)
    }
  }

  /**
    * el Playable.
    * @param {Element} element.
  */
  elPlayable(element) {
    const el = element
    const dataValue = el.dataset.value
    if (dataValue === '1' || dataValue === '2' || dataValue === '3' || dataValue === '4') {
      // belong to a player
      if (el.textContent === 'V' || el.textContent === 'B') { // is a base or village
        el.style.pointerEvents = 'auto'
        // el.style.opacity = '1'
        el.style.filter = 'grayscale(0%)'
        el.style.textContent = 'vv'
      }
    } else if (dataValue !== 'X' && dataValue !== '-1') {
      el.style.pointerEvents = 'auto'
      // el.style.opacity = '1'
      el.style.filter = 'grayscale(0%)'
      el.style.textContent = 'vv'
    }
  }

  /**
    * block Destroyable.
    * @param {String} entity.
  */
  blockDestroyable(entity) {
    console.log('blockDestroyable')
    const { world } = this.props
    let el
    let dataValue

    world.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        el = document.querySelector(`#I${rowIndex}_${colIndex}`)
        dataValue = el.dataset.value
        el.style.pointerEvents = 'none'
        // el.style.opacity = '0.33'
        el.style.filter = 'grayscale(50%)'
        if (dataValue !== entity && dataValue !== '0' && dataValue !== '-1') {
          if (el.textContent !== 'B' && el.textContent !== 'X' && el.textContent !== 'V') {
            el.style.pointerEvents = 'auto'
            // el.style.opacity = '1'
            el.style.filter = 'grayscale(0%)'
          }
        }
      })
    })
  }

  /**
    * new Player Turn.
    * @param {Object} nextProps.
  */
  newPlayerTurn(nextProps) {
    this.setState({
      turnState: nextProps.turn
    })
    newNumber(nextProps.number, false)
    this.nextPlayer(nextProps)
  }

  /**
    * destroy Loop.
    * @param {Number} x.
    * @param {Number} y.
    * @param {String} entity.
    * @param {String} type.
    * @param {Callback} callback.
  */
  destroyLoop(x, y, entity, type, callback) {
    const el = document.querySelector(`#I${x}_${y}`)
    if (el !== undefined) {
      const tabNeighbord = this.destroyNeighbor(x, y)
      if (this.friendlyNeighbor(x, y, entity)) {
        this.setPlayableAfterDestroy(x, y, type)
      }
      if (tabNeighbord.length !== 0) { // ici
        tabNeighbord.forEach((neighbord) => {
          const elId = this.parseElementToId(neighbord)
          if (this.friendlyNeighbor(x, y, entity)) {
            this.setPlayableAfterDestroy(elId[0], elId[1], type)
            callback(elId[0], elId[1], entity)
          }
        })
      }
    }
  }

  /**
    * block Destroy.
    * @param {String} entity.
    * @param {Element} element.
    * @param {String} type.
  */
  blockDestroy(entity, element, type) {
    const { world } = this.props
    let el
    if (!element) {
      world.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
          el = document.querySelector(`#I${rowIndex}_${colIndex}`)
          if (el.className === 'entity-1') {
            this.destroyLoop(rowIndex, colIndex, entity, type, () => {})
          }
        })
      })
    } else {
      const elId = this.parseElementToId(element)
      this.destroyLoop(elId[0], elId[1] - 1, entity, type, () => {})
      this.destroyLoop(elId[0], elId[1] + 1, entity, type, () => {})
      this.destroyLoop(elId[0] - 1, elId[1], entity, type, () => {})
      this.destroyLoop(elId[0] + 1, elId[1], entity, type, () => {})
    }
  }

  /**
    * friendly Neighbor.
    * @param {Number} x.
    * @param {Number} y.
    * @param {String} entity.
    * return {Boolean}
  */
  friendlyNeighbor(x, y, entity) {
    const elLeft = document.querySelector(`#I${x}_${y - 1}`)
    const elRight = document.querySelector(`#I${x}_${y + 1}`)
    const elTop = document.querySelector(`#I${x - 1}_${y}`)
    const elBottom = document.querySelector(`#I${x + 1}_${y}`)

    if (elLeft !== null && (elLeft.className === entity)) {
      return true
    }
    if (elRight !== null && (elRight.className === entity)) {
      return true
    }
    if (elTop !== null && (elTop.className === entity)) {
      return true
    }
    if (elBottom !== null && (elBottom.className === entity)) {
      return true
    }
    return false
  }

  /**
    * destroy Neighbor.
    * @param {Number} x.
    * @param {Number} y.
    * return {Array<Element>} tabNeighbord
  */
  destroyNeighbor(x, y) {
    const elLeft = document.querySelector(`#I${x}_${y - 1}`)
    const elRight = document.querySelector(`#I${x}_${y + 1}`)
    const elTop = document.querySelector(`#I${x - 1}_${y}`)
    const elBottom = document.querySelector(`#I${x + 1}_${y}`)
    const tabNeighbord = []

    if (elLeft !== null && elLeft.className === 'entity-1') {
      tabNeighbord.push(elLeft)
    }
    if (elRight !== null && elRight.className === 'entity-1') {
      tabNeighbord.push(elRight)
    }
    if (elTop !== null && elTop.className === 'entity-1') {
      tabNeighbord.push(elTop)
    }
    if (elBottom !== null && elBottom.className === 'entity-1') {
      tabNeighbord.push(elBottom)
    }
    return tabNeighbord
  }

  /**
    * init Block.
  */
  initBlock() {
    const { world } = this.props
    let el

    world.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        el = document.querySelector(`#I${rowIndex}_${colIndex}`)
        switch (el.dataset.value[0]) {
          case 'W':
            el.textContent = 'W'
            break
          case 'X':
            el.textContent = 'X'
            break
          case 'V':
            el.textContent = 'V'
            break
          case 'T':
            el.textContent = 'T'
            break
          case 'Z':
            el.textContent = 'Z'
            break
          case '-':
            el.style.backgroundImage = 'url("/asset/image/guillaume-04.png")'
            break
          case '1':
          case '2':
          case '3':
          case '4':
            el.textContent = 'B'
            el.style.backgroundImage = 'url("/asset/image/base_blue.png")'
            // el.
            break
          default:
            el.textContent = ''
            el.style.backgroundImage = 'url("/asset/image/guillaume-01.png")'
        }
      })
    })
  }

  /**
    * play First Number.
    * @param {Element} el.
  */
  playFirstNumber(el) {
    const {
      number,
      player,
      turn,
      dispatch
    } = this.props
    const { firstEnd, turnState } = this.state
    let currentNbTurn = turnState
    let isEnded = firstEnd
    const playerUpdated = player
    console.log('playFirstNumber')
    console.log(turnState)

    if (currentNbTurn.nbTurn === 0) {
      console.log('nbTurn = 0')
      if (number.secondNb === null) {
        console.log('second = null')
        // this.nextPlayer(player)
        this.firstBlockPlayable(null, null)
      } else {
        console.log('second exist')
        isEnded = true
        this.setState({
          firstEnd: isEnded
        })
        this.nextBlockPlayable(el, currentNbTurn.type)
      }
    } else {
      console.log('nbTurn != 0')
      currentNbTurn = this.newTurn(number.firstNb)
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
          console.log('second = null')
          // this.nextPlayer(player)
          this.firstBlockPlayable(null, null)
        } else {
          currentNbTurn = newTurn(number.secondNb, turn)
          this.firstBlockPlayable(player, currentNbTurn.type)
          this.blockDestroy(`entity${playerUpdated}`, undefined, currentNbTurn.type)
          dispatch(updateTurn(currentNbTurn))
          console.log('currentNbTurn in to second')
          console.log(currentNbTurn)
          this.setState({
            turnState: currentNbTurn
          })
        }
      } else {
        console.log('next turn')
        this.nextBlockPlayable(el, currentNbTurn.type)
        this.blockDestroy(`entity${playerUpdated}`, el, currentNbTurn.type)
      }
    }
  }

  /**
    * play Second Number.
    * @param {Element} el.
  */
  playSecondNumber(el) {
    const {
      number,
      player
    } = this.props
    const { turnState } = this.state
    let currentNbTurn = turnState
    const playerUpdated = player
    console.log('playSecondNumber')
    console.log(turnState)

    if (currentNbTurn.nbTurn === 0) {
      console.log('nbTurn === 0')
      // this.nextPlayer(player)
      this.firstBlockPlayable(null, null)
    } else {
      console.log('nbTurn =! 0')
      currentNbTurn = this.newTurn(number.secondNb)
      this.setState({
        turnState: currentNbTurn
      })
      if (currentNbTurn.nbTurn === 0) {
        console.log('last turn for second')
        // this.nextPlayer(player)
        this.firstBlockPlayable(null, null)
      } else {
        console.log('next turn')
        this.nextBlockPlayable(el, currentNbTurn.type)
        this.blockDestroy(`entity${playerUpdated}`, el, currentNbTurn.type)
      }
    }
  }

  /**
    * new Turn.
    * @param {Number} number.
    * return {Object} turnUpdated
  */
  newTurn(number) {
    const {
      turn,
      dispatch
    } = this.props
    let turnUpdated = turn

    turnUpdated = newTurn(number, turn)
    turnUpdated.nbTurn -= 1
    dispatch(updateTurn(turnUpdated))
    console.log('turnUpdated')
    console.log(turnUpdated)
    return turnUpdated
  }

  /**
    * next Player.
    * @param {Object} nextProps.
  */
  nextPlayer(nextProps) {
    const { dispatch } = this.props
    const { firstEnd } = this.state
    const { base, turn } = nextProps
    let { player } = nextProps
    let isEnded = firstEnd
    console.log('next player')
    isEnded = false
    dispatch(updateTurn(turn))
    this.setState({
      firstEnd: isEnded
    })
    player = nextPlayer(player, base)
    dispatch(updatePlayer(player))
    this.firstBlockPlayable(player, turn.type)
    this.blockDestroy(`entity${player}`, undefined, turn.type)
  }

  /**
    * next Player.
    * @param {Element} el.
  */
  play(el) {
    const { firstEnd } = this.state

    if (!firstEnd) {
      this.playFirstNumber(el)
    } else {
      this.playSecondNumber(el)
    }
  }

  /**
    * handle Click.
    * @param {event} event.
  */
  handleClick(event) {
    const { player } = this.props
    const el = event.target
    // console.log(world)
    // ici appel mais sert a rien
    // nextWorld(el.id, world, player)
    this.setBlock(el, player)
    this.play(el)
  }

  /**
    * render.
    * return {String}
  */
  render() {
    const { world } = this.props

    return (
      <table id="world">
        <tbody>
          { world.map((row, rowIndex) => (
            <tr key={rowIndex}>
              { row.map((col, colIndex) => (
                <td
                  className="borderTab block"
                  key={`${rowIndex}_${colIndex}`}
                >
                  <div
                    className={`entity${col}`}
                    data-value={col}
                    id={`I${rowIndex}_${colIndex}`}
                    onClick={(event) => {
                      this.handleClick(event)
                    }
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

/**
  * map State To Props.
  * @param {Object} state.
  * return {Object}
*/
const mapStateToProps = state => (
  {
    turn: state.home.turn,
    world: state.home.world,
    player: state.home.player,
    number: state.home.number,
    base: state.home.base
  }
)

export default connect(mapStateToProps)(World)
