import React, { Component, Fragment } from 'react';
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import { connect } from 'react-redux'
import Login from './Login'
import UnansweredQuestionList from './UnansweredQuestionList'
import AnsweredQuestionList from './AnsweredQuestionList'
import Question from './Question'
import CheckAuthentication from './CheckAuthentication'
import AddQuestion from './AddQuestion';
import Leaderboard from './Leaderboard';
class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    console.log(this.props.location)

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            {this.props.loading === true
              ? null
              : <div>
                <Switch>
                  <Route exact path='/' render={() => (
                    <Redirect to="/unanswered" />
                  )} />
                  <Route path='/login' component={Login} />
                  <CheckAuthentication exact path='/answered' component={AnsweredQuestionList} />
                  <CheckAuthentication exact path='/unanswered' component={UnansweredQuestionList} />
                  <CheckAuthentication path='/question/:questionId' component={Question} />
                  <CheckAuthentication path='/add' component={AddQuestion} />
                  <CheckAuthentication path='/leaderboard' component={Leaderboard} />
                </Switch>
              </div>}
          </div>
        </Fragment>
      </Router>
    );
  }
}


function mapStateToProps({ users }) {
  return {
    loading: users.size === 0
  }
}
export default connect(mapStateToProps)(App)

