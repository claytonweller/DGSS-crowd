import React from 'react';
import Question from './Question';

export function Trolly({ moduleState, sendInteraction }) {
  console.log('Step', moduleState.step);
  let display = null;
  const { currentQuestion: q } = moduleState;
  if (moduleState.step === 'show-question' && !moduleState.complete)
    display = (
      <Question key={q.default.text + q.alternative.text} moduleState={moduleState} sendInteraction={sendInteraction} />
    );

  return <div>{display}</div>;
}
