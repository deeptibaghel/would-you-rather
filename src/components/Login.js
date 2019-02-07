import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {

    state = {
        username: '',
        authenticated: false
    }

    handleChange = (user) => {
        const username = user
        this.setState(() => ({ username }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { username } = this.state
        const { dispatch } = this.props

        if (username !== "") {
            dispatch(setAuthedUser(username))
            this.setState(() => ({ authenticated: true }))
        }

    }
    render() {

        const { from } = this.props.location.state || { from: { pathname: '/' } }
        if (this.state.authenticated) {
            return <Redirect to={from} />
        }

        return (
            <Fragment>
                <div className='question'>
                    <p>
                        Play would you rather ?
                    </p>
                    <select
                        onChange={event => this.handleChange(event.target.value)}
                        defaultValue='default'>
                        <option
                            disabled
                            value='default'>
                            Choose user
                        </option>
                        {
                            this.props.users.map((user) => (
                                <option key={user.id} value={user.id}> {user.name}</option>
                            ))
                        }
                    </select>
                    &nbsp; &nbsp; &nbsp;
                    <button onClick={this.handleSubmit}>Log In</button>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps({ authedUser, users }, props) {
    return {
        authedUser,
        users: Object.keys(users).map(key => { return users[key] })
    }
}
export default connect(mapStateToProps)(Login)