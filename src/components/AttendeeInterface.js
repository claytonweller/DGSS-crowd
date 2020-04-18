import React from 'react'
import { client } from '..';

export class AttendeeInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDataIndex: 0
    };
  }

  handleSubmit(event) {
    console.log(this.state.selectedDataIndex)
    event.preventDefault()
    const { selectedDataIndex } = this.state
    const { audience_id, id: performance_id } = this.props.performances[selectedDataIndex]
    const payload = { action: 'join-performance', params: { audience_id, performance_id } }
    client.send(JSON.stringify(payload))
  }

  render() {
    console.log('selected', this.state.selectedDataIndex)
    const { performances, connection } = this.props
    let display = (<div>No shows to connect to</div>)
    console.log(performances)


    if (performances && performances.length && connection.performance_id === 0) {
      const performanceOptions = performances.map((p, i) => {
        return (<option value={i} key={p.id}>{p.created_at}</option>)
      })

      const joinButton = (<input type="submit" value="Join" />)
      display = (
        <div >
          <form onSubmit={event => this.handleSubmit(event)}>
            <label htmlFor="performances">Choose a performance:</label>
            <select onChange={event => this.setState({ selectedDataIndex: event.target.value })} value={this.state.selectedDataIndex} id="performances">
              {performanceOptions}
            </select>
            {joinButton}
          </form>

          <p />
          <div style={{ width: '95vw', wordWrap: 'break-word' }}>{JSON.stringify(performances)}</div>
        </div>
      )
    }

    return (
      <div>
        <h3>Attendee Interface</h3>
        {display}
      </div>
    )
  }

}