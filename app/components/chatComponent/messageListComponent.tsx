"use client"

import { ScrollShadow } from "@nextui-org/react"
import { ReactNode } from "react"

export default function MessageList({ children, className } : {
    children?: ReactNode,
    className?: string
}) {
    return (
        <ScrollShadow size={100}>
        <section className="flex flex-col gap-2 p-4 h-[60dvh] messageList overflow-y-scroll">
            {children}
        </section>
        </ScrollShadow>
    )
}