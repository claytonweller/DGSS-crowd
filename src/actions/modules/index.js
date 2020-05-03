import { preshowActionHash } from './preshow';

export const moduleActionHash = {
  ...preshowActionHash,
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
