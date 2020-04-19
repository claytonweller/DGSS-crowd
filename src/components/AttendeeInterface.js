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
    const selectedPerformance = this.props.activePerformances[selectedDataIndex]
    const { audience_id, id: performance_id } = selectedPerformance
    this.props.setPerformance(selectedPerformance)
    const payload = { action: 'join-performance', params: { audience_id, performance_id } }
    client.send(JSON.stringify(payload))
  }

  render() {
    console.log('selected', this.state.selectedDataIndex)
    const { activePerformances, connection } = this.props
    let display = (<div>No shows to connect to</div>)
    console.log(activePerformances)


    if (activePerformances && activePerformances.length && connection.performance_id === 0) {
      const performanceOptions = activePerformances.map((p, i) => {
        return (<option value={i} key={p.id}>{p.created_at}</option>)
      })

      const joinButton = (<input type="submit" value="Join" />)
      display = (
        <div >
          <form onSubmit={event => this.handleSubmit(event)}>
            <label htmlFor="activePerformances">Choose a performance:</label>
            <select
              onChange={event => this.setState({ selectedDataIndex: event.target.value })}
              value={this.state.selectedDataIndex}
              id="activePerformances"
            >
              {performanceOptions}
            </select>
            {joinButton}
          </form>

          <p />
          <div style={{ width: '95vw', wordWrap: 'break-word' }}>{JSON.stringify(activePerformances)}</div>
        </div>
      )
    }
    if (Object.keys(this.props.performance).length) {
      display = (
        <div>
          <h4>Joined Peformance!</h4>
          <div>{JSON.stringify(this.props.performance)}</div>
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