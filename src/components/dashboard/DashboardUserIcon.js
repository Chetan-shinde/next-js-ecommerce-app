"use client";
import "@/styles/dashboard.css";
import Image from "next/image";
import userImg from "../../../public/images/user.svg";
import Link from "next/link";
import { useState } from "react";

export default function DashboardUserIcon() {
  const [showSubMenu, setShowSubMenu] = useState(false);
  function handleClick() {
    setShowSubMenu(!showSubMenu);
  }
  return (
    <>
      <li className="dashboard-user-icon">
        <Link href="/dashboard" onClick={handleClick}>
          <Image src={userImg} alt="" />
        </Link>
      </li>
      {showSubMenu && (
        <ul className="dashboard-user-sub-menu">
          <li>Dashboard</li>
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        </ul>
      )}
    </>
  );
}
