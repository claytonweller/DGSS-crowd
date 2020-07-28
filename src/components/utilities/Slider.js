import React from 'react';

export default class Slider extends React.Component {
  render() {
    const { vertical } = this.props;
    const horzontalSlider = <input type="range" min={0} max={100} style={{ width: '100%' }} />;
    const verticalSlider = (
      <div style={{ height: '100%' }}>
        <input type="range" min={0} max={100} style={{ width: '100%', transform: 'rotateZ(270dg)' }} />
      </div>
    );
    const displaySlider = vertical ? verticalSlider : horzontalSlider;
    return displaySlider;
  }
}
