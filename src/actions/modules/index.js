import { preshowActionHash } from './preshow';
import { bootcampActionHash } from './bootcamp';
import { boatraceActionHash } from './boatrace';
import { trollyActionHash } from './trolly';

import { tttActionHash } from './ttt';

export const moduleActionHash = {
  ...tttActionHash,
  ...trollyActionHash,
  ...boatraceActionHash,
  ...preshowActionHash,
  ...bootcampActionHash,
  'start-next-module': startNextModuleAction,
};

function startNextModuleAction(params, component) {
  const { currentModule, performance } = params;

  console.log('Starting module:', currentModule.module.title);

  component.setState({
    moduleState: {},
    currentModule,
    performance,
  });
}

export const updateModuleState = (component, updates, clear = false) => {
  const moduleState = clear ? updates : { ...component.state.moduleState, ...updates };
  component.setState({ moduleState });
};
