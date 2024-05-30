import Image from "next/image";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      <section className="flex-center size-full max-sm:px-6">
        {children}
      </section>
      <div className="auth-asset">
        <div className="a">
          <Image src="/icons/auth-image.svg" alt="Auth" width={500} height={500} />
        </div>
      </div>
    </main>
  );
}