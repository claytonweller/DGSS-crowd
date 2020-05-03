export const preshowActionHash = {
  'preshow-next-question': nextQuestionAction,
};

async function nextQuestionAction(params, component) {
  console.log('Next question!');
  const { question, answered, attendee } = params;
  if (attendee) component.setState({ attendee });
  component.setState({ moduleState: { confirmed: true, question, answered } });
}
