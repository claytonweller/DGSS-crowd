import { client } from '../index';
import { DEBUG_MODE } from '../config';

export const utilitiesActionHash = {
  'local-server': localServerAction,
  'conn-update': connectionUpdateAction,
};

async function localServerAction(params, component) {
  console.log('local-server\n', params);
  const sendParams = {
    source: 'crowd',
  };
  client.send(JSON.stringify({ action: 'connect-source', params: sendParams }));
  component.setState({ currentConn: params });
}

async function connectionUpdateAction(params, component) {
  console.log('conn-update\n', params);
  const { activePerformances, currentConnection } = params;
  component.setState({ currentConn: currentConnection, activePerformances });
  console.log(DEBUG_MODE);
  if (!DEBUG_MODE) connectToMostRecentPerformance(activePerformances, component);
}

//

async function connectToMostRecentPerformance(activePerformances, component) {
  const mostRecentPerformance = activePerformances.reduce(
    (mrp, ap) => {
      if (mrp.id < ap.id) return ap;
      return mrp;
    },
    { id: 0 }
  );
  component.setPerformance(mostRecentPerformance);
  await connectToPerformance(mostRecentPerformance, component);
}

export async function connectToPerformance(performance, component) {
  component.setPerformance(performance);
  const { id, audience_id, current_module_title } = performance;
  const attendee = JSON.parse(localStorage.getItem('attendee'));
  const attendee_id = attendee ? attendee.id : null;
  const payload = {
    action: 'join-performance',
    params: { audience_id, performance_id: id, current_module_title, attendee_id, source: 'crowd' },
  };
  client.send(JSON.stringify(payload));
}
