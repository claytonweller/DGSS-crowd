export const boatraceActionHash = {
  'boatrace-ready-to-board': readyToBoardAction,
  'boatrace-boat-boarded': boatBoardedAction,
  'boatrace-boarding-over': boardingOverAction,
  'boatrace-coxswains-selected': coxswainsSelectedAction,
  'boatrace-open-for-naming': openForNamingAction,
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
