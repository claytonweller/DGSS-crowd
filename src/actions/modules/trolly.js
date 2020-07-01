import { updateModuleState } from '.';

export const trollyActionHash = {
  'trolly-show-question': showQuestionsAction,
  'trolly-choice-made': choiceMadeAction,
  'trolly-madness-over': madnessOverAction,
};

function showQuestionsAction(params, component) {
  updateModuleState(component, { ...params, step: 'show-question' });
}

function choiceMadeAction(params, component) {
  // TODO add some feedback that the choice has been recieved
}

function madnessOverAction(params, component) {
  updateModuleState(component, { complete: true }, true);
}
