import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { ColorSwatch, ColorPreview, ColorPickPopover, ColorPickCover } from './components';
import { RGBColor } from '../../types';

type Props = {
  userColor: RGBColor,
  setUserColor: (newColor: RGBColor) => void;
}
export default function ColorPicker(props: Props) {
  const { userColor, setUserColor } = props;
  const [ showColorPicker, setShowColorPicker ] = useState(false);
  const onColorPickerClick = () => setShowColorPicker(!showColorPicker);
  const onUserColorChange = (color: { rgb: RGBColor }) => setUserColor(color.rgb);

  return (
    <div style={{ position: 'relative' }}>
      <ColorSwatch onClick={onColorPickerClick}>
        <ColorPreview userColor={ userColor }/>
      </ColorSwatch>
      { showColorPicker ? 
        <ColorPickPopover>
          <ColorPickCover onClick={() => setShowColorPicker(false)} />
          <SketchPicker color={userColor} onChange={onUserColorChange} />
        </ColorPickPopover> 
      : null }
    </div>
  )
}