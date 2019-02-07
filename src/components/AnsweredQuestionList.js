import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'

class AnsweredQuestionList extends Component {

    render() {
        const { answeredQuestions } = this.props
        return (
            <Fragment>

                <div className='container'>
                    <NavBar />
                </div>
                <div>
                    <h3 className='center'>Questions</h3>
                    <ul className='dashboard-list'>
                        {
                            answeredQuestions.map((question) => (
                                <li key={question.id} className='question'>
                                    <Link to={`/question/${question.id}`}>
                                        {question.optionOne.text}  &nbsp; OR &nbsp; {question.optionTwo.text}
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
    let answeredQuestions = {}
    if (authedUser !== '') {
        answeredQuestions = Object.values(questions).filter((question) =>
            users[authedUser].answers.hasOwnProperty(question.id))

    }

    return {
        answeredQuestions: Object.values(answeredQuestions)
            .sort((a, b) => b.timestamp - a.timestamp),
    }
}
export default connect(mapStateToProps)(AnsweredQuestionList)