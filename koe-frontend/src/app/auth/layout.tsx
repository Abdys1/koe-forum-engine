export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="min-h-screen min-w-full flex justify-center items-center">
        {children}
      </section>
    )
  }