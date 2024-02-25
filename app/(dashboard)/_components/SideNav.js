"use client";
import {
  ChevronLeftCircle,
  ChevronRightCircle,
  File,
  Shield,
  Upload,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const SideNav = ({ sidebarToggler, sideBarEnabled }) => {
  //   const [sideBar, setSideBar] = useState(false);

  //   const sidebarToggler = () => {
  //     setSideBar(!sideBar);
  //   };

  const menuList = [
    {
      id: 1,
      name: "Uplaod",
      icon: Upload,
      path: "/upload",
    },
    {
      id: 2,
      name: "File",
      icon: File,
      path: "/files",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: Shield,
      path: "/upgrade",
    },
  ];

  const [activeState, setActiveState] = useState(0);

  return (
    <div className="border-r h-full shadow-sm ">
      <div className="p-5 border-b flex items-center gap-2 justify-center ">
        <Image
          className={`${sideBarEnabled ? "hidden" : null}`}
          src={"/logo.svg"}
          width={130}
          height={100}
          alt="logo"
        />
        <ChevronLeftCircle
          className={`${sideBarEnabled ? "hidden" : null} cursor-pointer`}
          onClick={() => sidebarToggler()}
        />
        <ChevronRightCircle
          className={`${!sideBarEnabled ? "hidden" : "w-8 h-8"} cursor-pointer`}
          onClick={() => sidebarToggler()}
        />
      </div>
      <div className="flex flex-col float-left w-full">
        {menuList.map((item, i) => (
          <Link href={`${item.path}`} >
            <button
              key={item.id}
              className={`flex gap-2 p-4 px-0 hover:bg-gray-100 w-full text-gray-500  ${sideBarEnabled ? " grid place-content-center pl-0 " : "pl-4"} ${activeState === i ? "bg-blue-50 text-primary" : null
                } `}
              onClick={() => setActiveState(i)}
            >
              <item.icon />
              <h2 className={`${sideBarEnabled ? "hidden" : null}`} >{item.name}</h2>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
