import { updateModuleState } from './';

export const tttActionHash = {
  'ttt-teams-created': teamsCreatedAction,
};

function teamsCreatedAction(params, component) {
  console.log('Template', params);
  updateModuleState(component, { step: 'lobby', team: params.name });
}
