"use client";

import { useContext } from "react";
import { MessContext } from "../providers";

export default function Home() {
  const { messValue } = useContext(MessContext);
  return (
    <>
      <h1 className="mx-auto my-auto">Home = {messValue}</h1>
    </>
  );
}
