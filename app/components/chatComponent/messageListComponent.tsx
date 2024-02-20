import { ReactNode } from "react"

export default function MessageList({ children, className } : {
    children: ReactNode,
    className?: string
}) {
    return (
        <section className="flex flex-col gap-2">
            {children}
        </section>
    )
}