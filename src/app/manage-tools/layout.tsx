import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect(
      `/login?callbackUrl=${encodeURIComponent(`/manage-tools`)}`
    );
  }

  return <>{children}</>;
}
