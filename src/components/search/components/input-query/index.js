import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getEventsData, getChangeText } from '../../actions'

class SearchQuery extends Component {
  handleChange(e) {
    e.preventDefault()

    getChangeText()
  }

  handleSubmit(e) {
    e.preventDefault()
    getEventsData()
  }

  render() {
    return (
      <form>
        <input type="text" className="orm-control mr-sm-2" name="texte" value={searchField} onChange={this.handleChange} />
        <input type="submit" className="btn" value="Submit" onClick={this.handleSubmit} />
      </form>
    )
  }
}

export default connect(state => state)(SearchQuery)
