import {
  FaHouse,
  FaUser,
  FaUtensils,
  FaCartShopping,
  FaChartSimple,
  FaCartPlus,
  FaMoneyBill1,
} from "react-icons/fa6";
import NavLink from "./navLink";
import getUserRole from "@/app/actions/get_user_role.action";
import { useContext, useEffect, useState } from "react";
import { MessContext } from "@/app/providers";

export default function NavLinks() {
  //TODO working here
  const [messCode, setMessCode] = useState("NUN");
  const { setMessValue, messValue, setIsAdmin, isAdmin } =
    useContext(MessContext);
  useEffect(() => {
    setMessCode(localStorage.getItem("MessCode"));
  }, [messValue]);
  return (
    <ul className="w-[250px] flex flex-col p-2">
      {!isAdmin && (<NavLink address={"/"} icon={FaHouse} linkName={"Home"} />)}
      {isAdmin && (
        <NavLink
          address={"/dashboard"}
          icon={FaChartSimple}
          linkName={"DashBoard"}
        />
      )}

      <NavLink address={"/profile"} icon={FaUser} linkName={"Profile"} />
      <NavLink
        address={"/meal-report"}
        icon={FaUtensils}
        linkName={"Meal Report"}
      />
      {!isAdmin && (<NavLink
        address={"/expenditure"}
        icon={FaCartShopping}
        linkName={"Expenditure"}
      />)}
      {isAdmin && (
        <NavLink
          address={"/add-expense"}
          icon={FaCartPlus}
          linkName={"Add Expense"}
        />
      )}
      {isAdmin && (
        <NavLink
          address={"/add-money"}
          icon={FaMoneyBill1}
          linkName={"Add Contribution"}
        />
      )}
    </ul>
  );
}
