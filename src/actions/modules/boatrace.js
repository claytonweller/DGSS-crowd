export const boatraceActionHash = {
  'boatrace-ready-to-board': readyToBoardAction,
  'boatrace-boat-boarded': boatBoardedAction,
  'boatrace-boarding-over': boardingOverAction,
  'boatrace-coxswains-selected': coxswainsSelectedAction,
  'boatrace-open-for-naming': openForNamingAction,
  'boatrace-boat-named': boatNamedAction,
  'boatrace-naming-closed': closeNamingAction,
  'boatrace-race-started': raceStartedAction,
};

function readyToBoardAction(params, component) {
  component.setState({
    moduleState: {
      step: 'boarding',
      boats: params.boats,
    },
  });
}

function boatBoardedAction(params, component) {
  component.setState({
    moduleState: {
      ...component.state.moduleState,
      myBoat: params.boat,
    },
  });
}

function boardingOverAction(params, component) {
  component.setState({
    moduleState: {
      step: 'boarding-over',
    },
  });
}

function coxswainsSelectedAction(params, component) {
  console.log(params);
  component.setState({
    moduleState: {
      step: 'meet-your-coxswain',
      ...params,
    },
  });
}

function openForNamingAction(params, component) {
  component.setState({
    moduleState: {
      ...component.state.moduleState,
      step: 'open-for-naming',
    },
  });
}

function boatNamedAction(params, component) {
  component.setState({
    moduleState: {
      ...component.state.moduleState,
      boat: params.boat,
    },
  });
}

function closeNamingAction(params, component) {
  const boat = params.boats.filter((b) => b.id === component.state.moduleState.boat.id)[0];

  component.setState({
    moduleState: {
      ...component.state.moduleState,
      boat,
      step: 'naming-closed',
    },
  });
}

function raceStartedAction(params, component) {
  component.setState({
    moduleState: {
      ...component.state.moduleState,
      command: params.coxswainCommand,
      step: 'racing',
    },
  });
}
