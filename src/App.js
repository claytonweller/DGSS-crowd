import React from 'react';
import './App.css';
import { manageMessage } from './actions';
import { client } from './index';
import { Module } from './components/modules/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleState: {},
      currentModule: {
        module: {},
        instance: {},
      },
      activePerformances: {},
      performance: {},
      audAttend: {},
      attendee: {},
      currentConn: {
        id: '',
        performance_id: 0,
        attendee_id: 0,
        aws_connection_id: '',
        created_at: '',
        source: 'crowd',
      },
    };
  }

  componentDidMount() {
    client.onopen = (message) => {
      const params = { source: 'crowd' };
      console.log('WebSocket Client Connected\n', message);
      // On AWS it works to send to the client in the onOpen, but for the local service this
      // doesn't work. So we manage that case inside of the manageMessage function
      client.send(JSON.stringify({ action: 'connect-source', params }));
    };
    client.onmessage = async (message) => {
      const data = JSON.parse(message.data);
      // We pass through the message, and the component. That way we can manage state based upon the
      // information the client gives us
      await manageMessage(data, this);
    };
  }

  setPerformance(performance) {
    this.setState({ performance });
  }

  sendInteraction(action, data) {
    const jsonData = JSON.stringify(data);
    const payload = JSON.stringify({
      action,
      params: {
        module_instance_id: this.state.currentModule.instance.id,
        attendee_id: this.state.attendee.id,
        attendee_name: this.state.attendee.name ? this.state.attendee.name : 'Anonymous',
        performance_id: this.state.performance.id,
        audience_id: this.state.audAttend.audience_id,
        module_id: this.state.currentModule.instance.module_id,
        data: jsonData,
      },
    });
    client.send(payload);
  }

  render() {
    return (
      <div className="App">
        <h1>CROWD</h1>
        <Module
          currentConn={this.state.currentConn}
          currentModule={this.state.currentModule}
          moduleState={this.state.moduleState}
          activePerformances={this.state.activePerformances}
          sendInteraction={(action, data) => this.sendInteraction(action, data)}
          setPerformance={(p) => this.setPerformance(p)}
        />
      </div>
    );
  }
}

export default App;
