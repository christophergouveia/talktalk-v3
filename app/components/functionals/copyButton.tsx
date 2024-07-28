import { Button } from '@nextui-org/react';
import { useState } from 'react';

export default function CopyButton({
  text,
  copy,
  sucessText,
  className,
}: {
  text: string;
  copy: string;
  sucessText: string;
  className?: string;
}) {
  const [buttonText, setButtonText] = useState(text);
  const [clicked, setClicked] = useState(false);

  const handleCopy = async (texto: string) => {
    if (navigator.clipboard && texto) {
      await navigator.clipboard.writeText(texto);
      setClicked(true);
      setButtonText(sucessText);
      setTimeout(() => {
        setButtonText(text);
        setClicked(false);
      }, 2000);
    }
  };

  return (
    <Button className={className} color={clicked ? 'success' : 'default'} onClick={() => handleCopy(copy)}>
      {buttonText}
    </Button>
  );
}
