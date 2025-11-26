import { Suspense } from "react";
import dynamic from "next/dynamic";
const LoginForm = dynamic(() => import("@/components/login-form"), {
  ssr: false,
});

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading …</div>}>
      <LoginForm />
    </Suspense>
  );
}
