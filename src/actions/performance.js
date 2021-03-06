export const performanceActionHash = {
  'performance-created': performanceCreatedAction,
  'performance-ended': performanceEndedAction,
  'performance-joined': performanceJoinedAction,
};

async function performanceJoinedAction(params, component) {
  console.log('Performance Joined\n', params);
  localStorage.setItem('attendee', JSON.stringify(params.attendee));
  component.setState(params);
}

// This doesn't currently DO anything, but eventually we might want to
// be able to alert someone when a show has begun? Maybe?
async function performanceCreatedAction(params, component) {
  console.log('Performance Created \n', params);
}

// This doesn't currently do enough.
async function performanceEndedAction(parms, component) {
  console.log('Performance Ended');
  component.setState({
    moduleState: {},
    currentModule: {
      module: {},
      instance: {},
    },
    activePerformances: {},
    performance: {},
    audAttend: {},
    attendee: {},
  });
}
