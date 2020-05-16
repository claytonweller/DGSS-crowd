import React from 'react';
import { Boatrace } from './Boatrace/';
import { Preshow } from './preshow/';
import { PerformanceConnector } from '../PerformanceConnector';
import { Bootcamp } from './Bootcamp/';

export function Module({
  currentModule,
  moduleState,
  sendInteraction,
  setPerformance,
  currentConn,
  activePerformances,
}) {
  const moduleHash = {
    boatrace: <Boatrace moduleState={moduleState} sendInteraction={sendInteraction} />,
    bootcamp: <Bootcamp moduleSate={moduleState} sendInteraction={sendInteraction} />,
    preshow: <Preshow moduleState={moduleState} sendInteraction={(action, data) => sendInteraction(action, data)} />,
    default: (
      <PerformanceConnector
        connection={currentConn}
        activePerformances={activePerformances}
        setPerformance={(p) => setPerformance(p)}
        performance={performance}
      />
    ),
  };

  const currentModuleTitle = currentModule.module.title;
  const moduleInterface = currentModuleTitle ? moduleHash[currentModuleTitle] : moduleHash.default;

  return moduleInterface;
}
