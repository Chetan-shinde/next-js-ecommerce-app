"use client";
import Image from "next/image";

import cartImg from "../../../public/images/cart.svg";
import Link from "next/link";
import MenuItem from "./MenuItems";
import UserIcon from "./UserIcon";
import DashboardUserIcon from "../dashboard/DashboardUserIcon";
import { AppState } from "@/context/Context";
import { Suspense } from "react";

const navitems = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  { name: "About us", link: "/about-us" },
  { name: "Services", link: "/services" },
  { name: "Contact us", link: "/contact-us" },
];

export default function Navbar({ isCMS }) {
  const { state, dispatch } = AppState();
  const { cart_items } = state;

  return (
    <nav
      className="custom-navbar navbar navbar navbar-expand-md navbar-dark"
      arial-label="Furni navigation bar"
    >
      <div className="container">
        <a className="navbar-brand" href="index.html">
          Furni<span>.</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsFurni"
          aria-controls="navbarsFurni"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsFurni">
          <MenuItem items={navitems} />
          <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
            {isCMS ? (
              <Suspense>
                <UserIcon />
              </Suspense>
            ) : (
              <DashboardUserIcon />
            )}
            <li className="cart-icon">
              <Link href="/cart">
                <Image src={cartImg} alt="" />
                <span className="cart-item-count">{cart_items}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
