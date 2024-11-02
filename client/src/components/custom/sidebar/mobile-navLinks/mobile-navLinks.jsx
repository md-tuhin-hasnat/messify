import Link from "next/link";
import {
  FaHouse,
  FaUser,
  FaUtensils,
  FaCartShopping,
  FaChartSimple,
} from "react-icons/fa6";
import NavLink from "./mobile-navLink";
import MobileSelectMess from "../mobile-select-mess";
export default function MobileNavLinks() {
  return (
    <div className="flex flex-row h-10 justify-around mt-1">
      <section className="flex-1">
        <MobileSelectMess />
      </section>
      <section className="flex-1">
        <NavLink address={"/"} icon={FaHouse} linkName={"Home"} />
      </section>
      <section className="flex-1">
        <NavLink
          address={"/dashboard"}
          icon={FaChartSimple}
          linkName={"DashBoard"}
        />
      </section>
      <section className="flex-1">
        <NavLink address={"/profile"} icon={FaUser} linkName={"Profile"} />
      </section>
      <section className="flex-1">
        <NavLink
          address={"/meal-report"}
          icon={FaUtensils}
          linkName={"Meal Report"}
        />
      </section>
      <section className="flex-1">
        <NavLink
          address={"/expenditure"}
          icon={FaCartShopping}
          linkName={"Expenditure"}
        />
      </section>
    </div>
  );
}
