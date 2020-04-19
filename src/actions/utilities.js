import { client } from '../index'

export const utilitiesActionHash = {
  'local-server': localServerAction,
  'conn-update': connectionUpdateAction
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