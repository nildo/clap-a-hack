import styled from 'styled-components';
import { RGBColor } from './types';

export const ColorSwatch = styled.div`
  padding: 5px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.1);
  display: inline-block;
  cursor: pointer;
`;

export const ColorPickPopover = styled.div`
  position: absolute;
  z-index: 2;
  background-color: white;
`;

export const ColorPickCover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

export const ColorPreview = styled.div.attrs((props: { userColor: RGBColor }) => {
  const { r, g, b, a } = props.userColor;
  return {
    style: {
      backgroundColor: `rgba(${r},${g},${b},${a})`
    }
  }
})<{ userColor: RGBColor }>`
  width: 36px;
  height: 14px;
  border-radius: 2px;
`;