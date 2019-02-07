import React, { Component } from 'react'
import NavBar from './NavBar'

class ErrorPage extends Component {
    render() {

        return (
            <div>
                <NavBar />
                Error 404 : Question Not Found
            </div>
        )
    }
}

export default ErrorPage