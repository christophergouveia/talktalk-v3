import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import Image from "next/image";
import { ReactNode } from "react";

export default function CardComponent({ children, imageSrc, titleButton } : { children: ReactNode, imageSrc: string, titleButton: string }) {
  return (
    <>
      <Card className="mt-6 w-96" placeholder={undefined}>
        <CardHeader placeholder={undefined}>
          <Image
            src={imageSrc}
            alt="card-image"
            width={500}
            height={500}
          />
        </CardHeader>
        <CardBody placeholder={undefined}>
          {children}
        </CardBody>
        <CardFooter className="pt-0" placeholder={undefined}>
          <Button placeholder={undefined}>{titleButton}</Button>
        </CardFooter>
      </Card>
    </>
  );
}