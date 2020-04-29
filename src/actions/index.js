import { performanceActionHash } from './performance'
import { utilitiesActionHash } from './utilities'
import { moduleActionHash } from './modules'

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
  ...utilitiesActionHash,
  ...performanceActionHash,
  ...moduleActionHash,
  defaultAction
}

async function defaultAction(params, component) { console.log('DEFAULT \n', params, component.state) }


