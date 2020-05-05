import React from 'react';

export function Bootcamp({ moduleSate, sendInteraction }) {
  const logo = <div>LOGO: Look at stage</div>;

  const test = (
    <div>
      <div>Press the button</div>
      <button onClick={() => sendInteraction('bootcamp-test-attempt', {})}>PRESS ME!</button>
    </div>
  );

  const renderSuccess = () => {
    return (
      <div>
        <div>Congrats {moduleSate.name}!</div>
        <div>You did it! Look at the screen for your name!</div>
      </div>
    );
  };

  let display = logo;
  if (moduleSate.testing) display = test;
  if (moduleSate.success) display = renderSuccess();

  return (
    <div>
      <h3>Bootcamp</h3>
      {display}
    </div>
  );
}
