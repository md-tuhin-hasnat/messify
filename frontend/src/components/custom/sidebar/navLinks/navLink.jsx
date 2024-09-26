import Link from "next/link";
import { FaHouse } from "react-icons/fa6";
export default function NavLink({ address, linkName, icon }) {
  const Icon = icon;
  return (
    <li className="py-2 hover:bg-accent rounded">
      <Link href={address} className="pl-3 flex gap-4 mx-0 my-auto">
        <Icon className="mx-0 my-auto" />
        <span className="mx-0 my-auto text-sm">{linkName}</span>
      </Link>
    </li>
  );
}
