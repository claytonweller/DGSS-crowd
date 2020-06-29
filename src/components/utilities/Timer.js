import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: this.props.initialTime,
      timerIsAlive: true,
    };
  }

  async componentDidMount() {
    while (this.state.timerIsAlive && this.state.timeRemaining > 0) {
      await this.decreaseTime();
    }
    this.props.onComplete();
  }

  getGranularity() {
    return this.props.granularity ? this.props.granularity : 100;
  }

  async decreaseTime() {
    const { timeRemaining } = this.state;
    const diff = timeRemaining - this.getGranularity();
    const newTime = diff < 0 ? 0 : diff;
    await new Promise((resolve) => setTimeout(resolve, this.getGranularity()));
    this.setState({ timeRemaining: newTime });
  }

  componentWillUnmount() {
    this.setState({ timerIsAlive: false });
  }

  render() {
    const percentRemaining = (this.state.timeRemaining / this.props.initialTime) * 100;
    return (
      <div>
        <div
          style={{
            backgroundColor: 'pink',
            width: `${percentRemaining}%`,
            transition: `width ${this.getGranularity() / 1000}s`,
            height: '10px',
          }}
        />
      </div>
    );
  }
}

export default Timer;
