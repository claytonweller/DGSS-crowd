import React from 'react';

export class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { boat } = this.props.moduleState;
    const { name } = this.state;
    this.props.sendInteraction('boatrace-name-boat', { boat, name });
  }

  moduleOptions() {
    return this.props.moduleTitles.map((m, i) => {
      return (
        <option value={i} key={`module${i}`}>
          {m}
        </option>
      );
    });
  }

  render() {
    return (
      <div>
        <div>Name Your Boat</div>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label htmlFor="nameBoat">Name</label>
          <input onChange={(event) => this.setState({ name: event.target.value })} type="text"></input>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
