import React from 'react'
import { client } from '..';

export class PerformanceConnector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDataIndex: 0
    };
  }

  handleSubmit(event) {
    event.preventDefault()
    const { selectedDataIndex } = this.state
    const selectedPerformance = this.props.activePerformances[selectedDataIndex]
    const { audience_id, id: performance_id } = selectedPerformance
    this.props.setPerformance(selectedPerformance)
    const payload = { action: 'join-performance', params: { audience_id, performance_id, source: 'crowd' } }
    client.send(JSON.stringify(payload))
  }

  render() {
    const { activePerformances } = this.props
    let display = this.noPerformances()

    if (activePerformances && activePerformances.length) {
      display = this.perfomancesAvailable()
    }
    if (Object.keys(this.props.performance).length) {
      display = this.joinedPerformance()
    }

    return (
      <div>
        <h3>Attendee Interface</h3>
        {display}
      </div>
    )
  }

  noPerformances() {
    return <div>No shows to connect to</div>
  }

  joinedPerformance() {
    return (
      <div>
        <h4>Joined Peformance!</h4>
        <div>{JSON.stringify(this.props.performance)}</div>
      </div>
    )
  }

  perfomancesAvailable() {
    const performanceOptions = this.props.activePerformances.map((p, i) => {
      return (<option value={i} key={p.id}>{p.created_at}</option>)
    })

    const joinButton = (<input type="submit" value="Join" />)
    return (
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
        <div style={{ width: '95vw', wordWrap: 'break-word' }}>{
          JSON.stringify(this.props.activePerformances.length)
        }</div>
      </div>
    )
  }
}