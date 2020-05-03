import React from 'react';

export class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
    };
  }

  handleSubmit({ event, skipText }) {
    if (event) event.preventDefault();
    const { questionData, answered } = this.props;
    const data = {
      response: skipText ? skipText : this.state.response,
      question: questionData,
      answered,
    };
    const action = questionData.core ? 'preshow-core-answer' : 'preshow-trivial-answer';
    this.props.sendInteraction(action, data);
    this.setState({ response: '' });
  }

  multipleChoiceResponse() {
    const { choices } = this.props.questionData;
    if (choices) {
      const buttons = this.props.questionData.choices.map((c, i) => {
        return <input onClick={() => this.setState({ response: c })} key={`res-${i}`} type="submit" value={c} />;
      });
      return <div>{buttons}</div>;
    }
    return this.textResponse();
  }

  textResponse() {
    return (
      <div>
        <input
          onChange={(event) => this.setState({ response: event.target.value })}
          type="text"
          value={this.state.response}
        />
        <input type="submit" value={this.props.questionData.buttonText} />
      </div>
    );
  }

  numberResponse() {
    const { min, max, buttonText } = this.props.questionData;
    return (
      <div>
        <input
          onChange={(event) => this.setState({ response: event.target.value })}
          type="number"
          value={this.state.response}
          min={min}
          max={max}
        />
        <input type="submit" value={buttonText} />
      </div>
    );
  }

  responseInterface() {
    const { responseType } = this.props.questionData;
    if (responseType === 'text') return this.textResponse();
    if (responseType === 'multiple-choice') return this.multipleChoiceResponse();
    if (responseType === 'number') return this.numberResponse();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.handleSubmit({ skipText: '-skip-' })} value="skip">
          Skip
        </button>
        <form onSubmit={(event) => this.handleSubmit({ event })}>
          <div></div>
          <label htmlFor="question">{this.props.questionData.text}</label>
          {this.responseInterface()}
        </form>
      </div>
    );
  }
}
