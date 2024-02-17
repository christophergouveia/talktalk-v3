import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mt-64 text-center">
      <h2 className="text-6xl font-bold">Página não encontrada</h2>
      <Button>
        <Link href="/">Voltar para a página principal</Link>
      </Button>
    </div>
  );
}
