import { ThemeProvider } from "@/components/theme-provider"

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex flex-col">
        {children}
    </div>
  )
}
