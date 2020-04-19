import { client } from '../index'

export const manageMessage = async (message, component) => {
  let action = Object.keys(actionHash).includes(message.action)
    ? actionHash[message.action]
    : actionHash.defaultAction

  try {
    return await action(message.params, component)
  } catch (e) {
    console.error(e)
  }
}

const actionHash = {
  'local-server': localServerAction,
  'conn-update': connectionUpdateAction,
  'performance-created': performanceCreatedAction,
  'performance-ended': performanceEndedAction,
  'performance-joined': perfomanceJoinedAction,
  defaultAction
}

async function defaultAction(params, component) { console.log('DEFAULT \n', params, component.state) }

async function perfomanceJoinedAction(params, component) {
  console.log('Performance Joined\n', params)
  component.setState({ ...params })
}

async function performanceCreatedAction(params, component) {
  console.log('Performance Created \n', params)
  component.setState({ performance: params })
}

async function performanceEndedAction(parms, component) {
  console.log('Performance Ended')
  component.setState({ performance: {} })
}

async function localServerAction(params, component) {
  console.log('local-server\n', params)
  const sendParams = {
    source: 'crowd'
  }
  client.send(JSON.stringify({ action: 'connect-source', params: sendParams }))
  component.setState({ currentConn: params })
}

async function connectionUpdateAction(params, component) {
  console.log('conn-update\n', params)
  const { activePerformances, currentConnection } = params
  component.setState({ currentConn: currentConnection, activePerformances })
}