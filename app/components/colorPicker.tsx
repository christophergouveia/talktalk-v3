import {  Colorful } from '@uiw/react-color';
import { useState, useEffect } from 'react';

export default function ColorPicker({ onColorChange } : any) {
  const [hex, setHex] = useState("#0dffff");
  useEffect(() => {
    onColorChange(hex);
  }, [hex, onColorChange]);

  return (
    <Colorful
      color={hex}
      disableAlpha
      className='lg:scale-100 scale-80'
      onChange={(color) => {
        setHex(color.hex);
      }}
    />
  );
}