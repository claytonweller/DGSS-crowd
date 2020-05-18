export const boatraceActionHash = {
  'boatrace-ready-to-board': readyToBoardAction,
  'boatrace-boat-boarded': boatBoardedAction,
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
