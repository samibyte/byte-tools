import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Navbar05 } from "./ui/shadcn-io/navbar-05";
import { getServerSession } from "next-auth";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Navbar05
        userName={session?.user?.name}
        userEmail={session?.user?.email}
        userAvatar={session?.user?.image}
      />
    </>
  );
}
