import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'

class UnansweredQuestionList extends Component {

    render() {
        const { unansweredQuestions } = this.props
        return (
            <Fragment>

                <div className='container'>
                    <NavBar />
                </div>
                <div>
                    <h3 className='center'>Questions</h3>
                    <ul className='dashboard-list'>
                        {
                            unansweredQuestions.map((question) => (
                                <li key={question.id} className='question'>
                                    <Link to={`/question/${question.id}`}>
                                        Would you rather ? &nbsp; &nbsp; - by {question.author}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps({ authedUser, questions, users }, props) {
    let unansweredQuestions = {}
    if (authedUser !== '') {
        unansweredQuestions = Object.values(questions).filter((question) =>
            !users[authedUser].answers.hasOwnProperty(question.id))

    }

    return {
        unansweredQuestions: Object.values(unansweredQuestions)
            .sort((a, b) => b.timestamp - a.timestamp),
    }
}
export default connect(mapStateToProps)(UnansweredQuestionList)