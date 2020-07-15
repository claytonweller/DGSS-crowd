import React from 'react';

export class Disclaimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepCount: DEBUG_MODE ? 7 : 0,
      skipIsVisible: false,
      skipText: '',
    };
  }

  advanceButton(text) {
    const advance = () => this.setState({ stepCount: this.state.stepCount + 1 });
    return <button onClick={advance}>{text}</button>;
  }

  basicStep(instructions, buttonText) {
    return (
      <div>
        <div>{instructions}</div>
        {this.advanceButton(buttonText)}
      </div>
    );
  }

  stepBeforeSkip(instructions, buttonText) {
    return (
      <div>
        <div>{instructions}</div>
        <button
          onClick={() => {
            this.skipWaitTextUpdate();
            this.setState({ stepCount: this.state.stepCount + 1 });
          }}
        >
          {buttonText}
        </button>
      </div>
    );
  }

  skipWaitTextUpdate() {
    this.setState({ skipText: 'If you would like to abstain. You can simply wait.' });
    setTimeout(() => {
      this.setState({ skipText: 'OR if the SKIP button is visible you can press it' });
    }, 3000);
    setTimeout(() => {
      this.setState({ skipIsVisible: true });
    }, 4500);
    setTimeout(() => {
      this.setState({ skipText: 'Try Pressing the Skip Button. (SAY THE LOCATION)' });
    }, 7000);
  }

  skipStep() {
    return (
      <div>
        <div>{this.state.skipText}</div>
      </div>
    );
  }

  fakeSkipButton() {
    const fakeSkipButtonAction = () => {
      this.setState({ skipIsVisible: false, stepCount: this.state.stepCount + 1 });
    };
    const displayState = this.state.skipIsVisible ? 'inline-block' : 'none';
    return (
      <button onClick={fakeSkipButtonAction} style={{ display: displayState }}>
        SKIP!
      </button>
    );
  }

  finalStep() {
    const finalStepClick = () => {
      const data = JSON.stringify('Acknowledge');
      this.props.sendInteraction('preshow-acknowledge', data);
    };
    return (
      <div>
        <div>Great! By clicking you aknowledge that the data you submit will be used during the show.</div>
        <button onClick={finalStepClick}>I Acknowledge</button>
      </div>
    );
  }

  steps() {
    const stepArray = [
      this.basicStep('Welcome to Data Game Show Show!', 'Click Me!'),
      this.basicStep('This show is interactive.\nYou will use your phone!', 'OK!'),
      this.basicStep('This show is about data.\nCollecting, analyzing, and playing with it!', 'Neato!'),
      this.basicStep('When you interact, you will provide data.', 'Makes Sense'),
      this.basicStep('We promise not to sell or distribute sensitive informaiton.', 'Thanks'),
      this.stepBeforeSkip(
        'BUT! We will display data during this show. So, before you interact keep that in mind',
        'Yo Comprendo'
      ),
      this.skipStep(),
      this.finalStep(),
    ];
    return <div>{stepArray[this.state.stepCount]}</div>;
  }

  render() {
    return (
      <div>
        <h3>Disclaimer</h3>
        {this.steps()}
        {this.fakeSkipButton()}
      </div>
    );
  }
}
