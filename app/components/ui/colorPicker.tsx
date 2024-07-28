import { Colorful } from '@uiw/react-color';
import { useState, useEffect } from 'react';

export default function ColorPicker({
  onColorChange,
  initialHex = '#0dffff',
}: {
  onColorChange: (hex: string) => void;
  initialHex?: string;
}) {
  const [hex, setHex] = useState(initialHex);
  useEffect(() => {
    onColorChange(hex);
  }, [hex, onColorChange]);

  return (
    <Colorful
      color={hex}
      disableAlpha
      className="scale-80 lg:scale-100"
      onChange={(color) => {
        setHex(color.hex);
      }}
    />
  );
}
