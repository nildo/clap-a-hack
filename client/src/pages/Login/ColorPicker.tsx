import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import styled from 'styled-components';

type RGBColor = {
    r: number;
    g: number;
    b: number;
    a?: number;
}

const Swatch = styled.div`
  padding: 5px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.1);
  display: inline-block;
  cursor: pointer;
`;
const ColorPreview = styled.div`
  width: 36px;
  height: 14px;
  border-radius: 2px;
  /* background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`, */
`;
const ColorPickPopover = styled.div`
  position: absolute;
      z-index: 2;
`;
const ColorPickerCover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

export default function ColorPicker() {
  const [ showColorPicker, setShowColorPicker ] = useState(false);
  const [ userColor, setUserColor ] = useState<RGBColor>({
    r: 241,
    g: 112,
    b: 19,
    a: 1
  });
  const onColorPickerClick = () => setShowColorPicker(!showColorPicker);
  const onUserColorChange = (color: { rgb: RGBColor }) => setUserColor(color.rgb);

  return (
    <>
      <Swatch onClick={onColorPickerClick}>
        <ColorPreview />
      </Swatch>
      { showColorPicker ? 
        <ColorPickPopover>
          <ColorPickerCover onClick={() => setShowColorPicker(false)} />
          <SketchPicker color={userColor} onChange={onUserColorChange} />
        </ColorPickPopover> 
      : null }
    </>
  )
}