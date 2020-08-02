import React from 'react';
import { Ttt } from './Ttt/';
import { Trolly } from './Trolly/';
import { Boatrace } from './Boatrace/';
import { Preshow } from './preshow/';
import { PerformanceConnector } from '../PerformanceConnector';
import { Bootcamp } from './Bootcamp/';
import { DEBUG_MODE } from '../../config';

export function Module({
  currentModule,
  moduleState,
  sendInteraction,
  setPerformance,
  currentConn,
  activePerformances,
}) {
  const moduleHash = {
    ttt: <Ttt moduleState={moduleState} sendInteraction={sendInteraction} />,
    trolly: <Trolly moduleState={moduleState} sendInteraction={sendInteraction} />,
    boatrace: <Boatrace moduleState={moduleState} sendInteraction={sendInteraction} />,
    bootcamp: <Bootcamp moduleSate={moduleState} sendInteraction={sendInteraction} />,
    preshow: <Preshow moduleState={moduleState} sendInteraction={(action, data) => sendInteraction(action, data)} />,
    default: DEBUG_MODE ? (
      <PerformanceConnector
        connection={currentConn}
        activePerformances={activePerformances}
        setPerformance={(p) => setPerformance(p)}
        performance={performance}
      />
    ) : (
      <div>Connecting to performance!</div>
    ),
  };

  const currentModuleTitle = currentModule.module.title;
  const moduleInterface = currentModuleTitle ? moduleHash[currentModuleTitle] : moduleHash.default;

  return moduleInterface;
}
