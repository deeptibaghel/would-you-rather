import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { unsetAuthedUser } from "../actions/authedUser"

class NavBar extends Component {

  state = {
    authenticated: true
  }

  handleLogout = () => {
    this.props.dispatch(unsetAuthedUser())
    this.setState(() => ({
      authenticated: false
    }))

  }
  render() {

    const { userName } = this.props
    const { authenticated } = this.state
    if (!authenticated) {
      return <Redirect to="/login" />
    }
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/add' exact activeClassName='active'>
              Add question
            </NavLink>
          </li>
          <li>
            <NavLink to='/unanswered' activeClassName='active'>
              Unanswered questions
            </NavLink>
          </li>
          <li>
            <NavLink to='/answered' activeClassName='active'>
              Answered questions
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li className='leftpadding'>
            <b>
              <img
                src={this.props.user.avatarURL}
                alt={`Avatar of ${this.props.user.name}`}
                className='avatarNew'
              />
              {userName} &nbsp; </b>
            <button className='active' onClick={this.handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps({ authedUser, users }, props) {
  return {
    user: users[authedUser],
    userName: authedUser === '' ? '' : users[authedUser].name
  }
}
export default connect(mapStateToProps)(NavBar)