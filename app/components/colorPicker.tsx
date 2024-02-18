import {  Wheel } from '@uiw/react-color';
import { useState, useEffect } from 'react';

export default function ColorPicker({ onColorChange } : any) {
  const [hex, setHex] = useState("#0dffff");
  useEffect(() => {
    onColorChange(hex);
  }, [hex, onColorChange]);

  return (
    <Wheel
      color={hex}
      onChange={(color) => {
        setHex(color.hex);
      }}
    />
  );
}