import actionsType from './actions-type'
import store from '../../../store'

const getMap = events => ({
  type: actionsType.GET_Map,
  data: events
})

export const getEventsMap1 = () => {
  const map1 = [
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 1]
  ]

  store.dispatch(getMap(map1))
}
