"use client"
import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import TopHeader from "./_components/TopHeader";

const layout = ({ children }) => {

  const [sideBar, setSideBar] = useState(window.innerWidth < 678);

  const sidebarToggler = ()=>{
    setSideBar(!sideBar);
  }

  return (
    <div>
      <div className={` ${sideBar?"w-16":"w-64"} h-full flex-col fixed inset-y-0 z-50 md:flex`} >
      <SideNav sidebarToggler={sidebarToggler} sideBarEnabled={sideBar}  />
      </div>
      <div className={`${!sideBar?"md:ml-64":"ml-16"}`}  >
        <TopHeader sidebarToggler={sidebarToggler} sideBarEnabled={sideBar}  />
      {children}
      </div>
    </div>
  );
};

export default layout;
