import React from 'react';
import { createGoofyName } from './createGoofyName';

export class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      goofyName: '',
    };
  }

  handleSubmit({ event, skipText, goofyName }) {
    if (event) event.preventDefault();
    const { questionData, answered } = this.props;
    const response = this.state.response === '' ? goofyName : this.state.response;
    const data = {
      response: skipText ? skipText : response,
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

  labelText(goofyName) {
    const { column, text } = this.props.questionData;
    if (column === 'name') {
      return (
        <div>
          <div>{text} If you skip this question we will call you: </div>
          <div style={{ fontWeight: 'bold' }}>{goofyName}</div>
        </div>
      );
    }
    return <div>{text}</div>;
  }

  render() {
    const { column } = this.props.questionData;
    let goofyName = column === 'name' ? createGoofyName() : null;

    return (
      <div>
        <button onClick={() => this.handleSubmit({ skipText: goofyName || '-skip-' })} value="skip">
          Skip
        </button>
        <form onSubmit={(event) => this.handleSubmit({ event, goofyName })}>
          <div></div>
          <label htmlFor="question">{this.labelText(goofyName)}</label>
          {this.responseInterface()}
        </form>
      </div>
    );
  }
}
