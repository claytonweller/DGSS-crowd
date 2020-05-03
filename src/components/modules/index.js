import React from 'react';
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
    bootcamp: <Bootcamp />,
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
