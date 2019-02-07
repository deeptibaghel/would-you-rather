import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'

class Leaderboard extends Component {
    render() {
        const { users, usersId } = this.props
        return (
            <Fragment>
                <div className='container'>
                    <NavBar />
                </div>
                <div>
                    <h1 >Leaderboard</h1>
                    {usersId.map((id) =>
                        <div className='question'>
                            <img
                                src={users[id].avatarURL}
                                alt={`Avatar of ${users[id].name}`}
                                className='avatar'
                            />
                            <div>
                                {users[id].name}
                            </div>
                            <div>
                                Questions asked : {users[id].questions.length}
                            </div>
                            <div>
                                Answers given : {Object.keys(users[id].answers).length}
                            </div>
                        </div>

                    )}
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users,
        usersId: Object.keys(users)
            .sort((a, b) => ((Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length)))
    }
}

export default connect(mapStateToProps)(Leaderboard)