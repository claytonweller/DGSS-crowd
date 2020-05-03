import { preshowActionHash } from './preshow';
import { bootcampActionHash } from './bootcamp';

export const moduleActionHash = {
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
