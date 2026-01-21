import { LoginCard } from "@/components/login/login-card";

export default function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <LoginCard />
      </div>
    </section>
  );
}
