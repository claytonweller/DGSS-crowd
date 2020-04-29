import React from 'react'

export class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ''
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const { questionData, answered } = this.props
    const data = {
      response: this.state.response,
      question: questionData,
      answered
    }
    console.warn(answered)
    const action = questionData.core ? 'preshow-core-answer' : 'preshow-trivial-answer'
    this.props.sendInteraction(action, data)
  }

  render() {
    return (
      <div>
        <form onSubmit={event => this.handleSubmit(event)}>
          <label htmlFor="question">{this.props.questionData.text}</label>
          <input
            onChange={event => this.setState({ response: event.target.value })}
            type='text'
            value={this.state.response}
          />
          <input type="submit" value={this.props.questionData.buttonText} />
        </form>
      </div >
    )
  }

}