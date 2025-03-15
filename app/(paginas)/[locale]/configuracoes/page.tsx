'use client';

import { Button } from "@heroui/react";
import Image from 'next/image';
import { ReactNode } from 'react';
import { useTranslation } from "react-i18next";


export default function configuracoesPage() {
    const { t } = useTranslation('', { keyPrefix: 'configuracoes' });
    return (
        <div>
            ola
        </div>
    );
}

