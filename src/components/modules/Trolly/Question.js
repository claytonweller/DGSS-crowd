import React from 'react';
import Timer from '../../utilities/Timer';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultChosen: this.props.moduleState.timer ? true : false,
      alternativeChoesn: false,
      choiceOpen: true,
    };
  }

  render() {
    const { currentQuestion: q } = this.props.moduleState;

    const choices = (
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {this.displayChoice(q.default, this.state.defaultChosen)}
        {this.displayChoice(q.alternative, this.state.alternativeChoesn)}
      </div>
    );

    return (
      <div>
        <div>{this.timerDisplay()}</div>
        {choices}
      </div>
    );
  }

  ///

  onTimerComplete() {
    this.setState({ choiceOpen: false });
  }

  timerDisplay() {
    const { timer, currentQuestion: q } = this.props.moduleState;
    return timer && timer < 10000 ? (
      <Timer onComplete={() => this.onTimerComplete()} key={q.default.text + q.alternative.text} initialTime={timer} />
    ) : null;
  }

  displayChoice(choice, selected) {
    const fontWeight = selected ? 'bold' : 'normal';
    return (
      <div style={{ width: '50%' }}>
        <h3 style={{ fontWeight }}>{choice.text}</h3>
        {this.choiceButton(selected, choice)}
      </div>
    );
  }

  choiceButton(selected, choice) {
    const { timer } = this.props.moduleState;
    return timer && this.state.choiceOpen ? (
      <button onClick={() => this.updateChoice(selected, choice)}>{selected ? 'Chosen' : 'Switch'}</button>
    ) : null;
  }

  updateChoice(selected, choice) {
    if (!selected) {
      const { currentQuestion: q } = this.props.moduleState;
      const { defaultChosen, alternativeChoesn } = this.state;
      const data = {
        default: {
          text: q.default.text,
          chosen: !defaultChosen,
        },
        alternative: {
          text: q.alternative.text,
          chosen: !alternativeChoesn,
        },
        response: choice.text,
        prompt: `${q.default.text} or ${q.alternative.text}?`,
        intentional: true,
      };
      this.props.sendInteraction('trolly-choice', data);
      this.setState({ defaultChosen: !defaultChosen, alternativeChoesn: !alternativeChoesn });
    }
  }
}

export default Question;
