import Link from "next/link";
import { usePathname } from "next/navigation";
export default function NavLink({ address, icon }) {
  const Icon = icon;
  const pathName = usePathname();
  return (
    <div className={`py-2 hover:bg-accent rounded-full`}>
      <Link href={address} className={`flex justify-center my-auto`}>
        <Icon
          className={`mx-0 my-auto h-6 w-6 ${
            pathName === address ? "text-primary" : ""
          }`}
        />
      </Link>
    </div>
  );
}
