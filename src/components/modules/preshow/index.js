import React from "react";
import { Disclaimer } from "./Disclaimer";
import { Question } from "./Question";

export function Preshow(props) {
  let display = <Disclaimer sendInteraction={props.sendInteraction} />;
  if (props.moduleState.confirmed) {
    display = (
      <div>
        <Question
          sendInteraction={props.sendInteraction}
          questionData={props.moduleState.question}
          answered={props.moduleState.answered}
        />
      </div>
    );
  }

  return (
    <div>
      <h3>Preshow</h3>
      {display}
    </div>
  );
}
