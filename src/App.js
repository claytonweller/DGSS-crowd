import React from 'react';
import './App.css';
import { manageMessage } from './actions';
import { client } from './index'
import { WebsocketTestButtons } from './components/WebsocketTestButtons';
import { AttendeeInterface } from './components/AttendeeInterface';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePerformances: {},
      performance: {},
      audAttend: {},
      attendee: {},
      currentConn: {
        id: "",
        performance_id: 0,
        attendee_id: 0,
        aws_connection_id: "",
        created_at: "",
        source: "crowd"
      }
    };
  }

  componentDidMount() {
    client.onopen = message => {
      const params = { source: 'crowd' }
      console.log('WebSocket Client Connected\n', message);
      // On AWS it works to send to the client in the onOpen, but for the local service this
      // doesn't work. So we manage that case inside of the manageMessage function
      client.send(JSON.stringify({ action: 'connect-source', params }))
    };
    client.onmessage = async (message) => {
      const data = JSON.parse(message.data)
      // We pass through the message, and the component. That way we can manage state based upon the
      // information the client gives us
      await manageMessage(data, this)
    };
  }

  setPerformance(performance) {
    this.setState({ performance })
  }

  render() {
    return (
      <div className="App" >
        <h1>CROWD</h1>
        <AttendeeInterface
          connection={this.state.currentConn}
          activePerformances={this.state.activePerformances}
          setPerformance={p => this.setPerformance(p)}
          performance={this.state.performance}
        />
        <h3>Connection display</h3>
        <div style={{ width: '95vw', wordWrap: 'break-word' }}>{JSON.stringify(this.state.currentConn)}</div>
        <WebsocketTestButtons />
      </div>
    )
  }
}

export default App;
