import { updateModuleState } from './';

export const boatraceActionHash = {
  'boatrace-ready-to-board': readyToBoardAction,
  'boatrace-boat-boarded': boatBoardedAction,
  'boatrace-boarding-over': boardingOverAction,
  'boatrace-coxswains-selected': coxswainsSelectedAction,
  'boatrace-open-for-naming': openForNamingAction,
  'boatrace-boat-named': boatNamedAction,
  'boatrace-naming-closed': closeNamingAction,
  'boatrace-race-started': raceStartedAction,
  'boatrace-stroke-fail': strokeFailAction,
  'boatrace-stroke-success': strokeSuccessAction,
  'boatrace-stroke-progress': strokeProgressAction,
  'boatrace-stroke-finish': strokeFinishAction,
  'boatrace-race-ended': raceEndedAction,
};

function readyToBoardAction(params, component) {
  updateModuleState(component, { step: 'boarding', boats: params.boats });
}

function boatBoardedAction(params, component) {
  updateModuleState(component, { myBoat: params.boat });
}

function boardingOverAction(params, component) {
  updateModuleState(component, { step: 'boarding-over' }, true);
}

function coxswainsSelectedAction(params, component) {
  updateModuleState(component, { step: 'meet-your-coxswain', ...params }, true);
}

function openForNamingAction(params, component) {
  updateModuleState(component, { step: 'open-for-naming' });
}

function boatNamedAction(params, component) {
  updateModuleState(component, { boat: params.boat });
}

function closeNamingAction(params, component) {
  const boat = params.boats.filter((b) => b.id === component.state.moduleState.boat.id)[0];
  updateModuleState(component, { boat, step: 'naming-closed' });
}

function raceStartedAction(params, component) {
  updateModuleState(component, { command: params.coxswainCommand, step: 'racing' });
}

function strokeFailAction(params, component) {
  console.warn('FAIL', params.coxswainCommand);
  updateModuleState(component, { command: params.coxswainCommand });
}

function strokeSuccessAction(params, component) {
  const { command } = component.state.moduleState;
  updateModuleState(component, { boat: params.boat, command: params.command });
}

function strokeProgressAction(params, component) {
  console.warn(params.coxswainCommand);
  updateModuleState(component, { command: params.coxswainCommand });
}

function strokeFinishAction(params, component) {
  updateModuleState(component, { podiumPosition: params.podiumPosition, step: 'race-ended' });
}

function raceEndedAction(params, component) {
  const boatName = component.state.moduleState.boat.name;
  const podiumPosition = params.podium.reduce((pos, name, i) => {
    if (name === boatName) return i + 1;
    return pos;
  }, 0);
  updateModuleState(component, { podiumPosition, step: 'race-ended' });
}
