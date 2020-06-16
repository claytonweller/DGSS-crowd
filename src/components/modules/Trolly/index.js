import React from 'react';

export function Trolly({ moduleState }) {
  let display = null;
  if (moduleState.step === 'title') display = <h3>The Trolly Problem</h3>;
  if (moduleState.step === 'show-question ') display = showQuestion();

  const showQuestion = () => {
    const { currentQuestion: q, timer } = moduleState;
    // Shows each option
    // Shows the selected options
    // Allows to switchto unselected option
    // Shows countdown if timer is present
    // does not allow selections if countdown is complete
    // does not show countdown if timer is huge

    const defaultChoice = (
      <div>
        <h3>default</h3>
        <button>Select</button>
      </div>
    );

    const alternativeChoice = (
      <div>
        <h3>alt</h3>
        <button>Select</button>
      </div>
    );

    return (
      <div>
        {defaultChoice}
        <div>
          <button></button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div></div>
      {display}
    </div>
  );
}
