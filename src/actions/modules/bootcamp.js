export const bootcampActionHash = {
  'bootcamp-test-started': testStartedAction,
  'bootcamp-test-ended': testEndedAction,
  'bootcamp-test-success': testSuccessAction,
};

function testStartedAction(params, component) {
  console.log('TEST START');
  component.setState({ moduleState: { testing: true } });
}

function testSuccessAction(params, component) {
  console.log('TEST SUCCESS');
  component.setState({ moduleState: { success: true, name: params.attendee_name } });
}

function testEndedAction(params, component) {
  console.log('TEST END');
  component.setState({ moduleState: {} });
}
