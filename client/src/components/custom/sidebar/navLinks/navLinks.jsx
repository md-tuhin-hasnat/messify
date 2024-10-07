import Link from "next/link";
import {
  FaHouse,
  FaUser,
  FaUtensils,
  FaCartShopping,
  FaChartSimple,
} from "react-icons/fa6";
import NavLink from "./navLink";
export default function NavLinks() {
  return (
    <ul className="w-[250px] flex flex-col p-2">
      <NavLink address={"#"} icon={FaHouse} linkName={"Home"} />
      <NavLink address={"#"} icon={FaChartSimple} linkName={"DashBoard"} />
      <NavLink address={"#"} icon={FaUser} linkName={"Profile"} />
      <NavLink address={"#"} icon={FaUtensils} linkName={"Meal Report"} />
      <NavLink address={"#"} icon={FaCartShopping} linkName={"Expenditure"} />
    </ul>
  );
}
