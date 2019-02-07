import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import NavBar from './NavBar'
import { handleAddQuestion } from "../actions/questions"

class AddQuestion extends Component {

    state = {
        optionOneText: '',
        optionTwoText: '',
        questionAdded: false
    }

    handleChange = (e) => {
        const name = e.target.name
        const text = e.target.value
        this.setState(() => ({
            [name]: text
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOneText, optionTwoText } = this.state
        const { dispatch } = this.props
        dispatch(handleAddQuestion(optionOneText, optionTwoText))

        this.setState(() => ({
            questionAdded: true
        }))
    }

    render() {
        const { optionOneText, optionTwoText, questionAdded } = this.state

        if (questionAdded) {
            return <Redirect to='/' />
        }
        return (
            <Fragment>
                <div className='container'>
                    <NavBar />
                </div>
                <div className='tweet'>
                    <p  >
                        Would you rather
                     </p>
                    <form className='ask-form' onSubmit={this.handleSubmit}>
                        <textarea
                            value={optionOneText}
                            onChange={this.handleChange}
                            name='optionOneText'
                            className='input-option'
                            rows='1'
                            maxLength='100'
                            placeholder='Option one'
                            tabIndex='1'
                            required />
                        <textarea
                            value={optionTwoText}
                            onChange={this.handleChange}
                            name='optionTwoText'
                            className='input-option'
                            rows='1'
                            maxLength='100'
                            placeholder='Option two'
                            tabIndex='2'
                            required />
                        <input type='submit' value='Submit' className='submit-question' />
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default AddQuestion