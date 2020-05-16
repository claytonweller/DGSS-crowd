export const boatraceActionHash = {
  'boatrace-ready-to-board': readyToBoardAction,
};

function readyToBoardAction(params, component) {
  console.warn(params);
  component.setState({
    moduleState: {
      step: 'boarding',
      boats: params.boats,
    },
  });
}
