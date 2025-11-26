import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/byte-tools-logo.png"
        width={60}
        height={60}
        alt="byte tools logo"
        className="cursor-pointer"
      />
    </Link>
  );
};
