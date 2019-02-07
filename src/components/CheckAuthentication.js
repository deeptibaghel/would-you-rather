import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

class CheckAuthentication extends Component {
  render() {
    const { component: Component, authenticated, path, ...rest } = this.props
    return (
      <Route {...rest}
        render={props => (
          authenticated === true
            ? <Component {...rest} />
            : <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
        )} />
    )
  }
}

function mapStateToProps({ authedUser }) {
  const authenticated = authedUser !== null
  return {
    authenticated
  }
}

export default connect(mapStateToProps)(CheckAuthentication)
