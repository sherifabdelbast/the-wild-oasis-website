import React from "react";
import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({children} : {children : React.ReactNode}){

    return <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] h-full gap-4 md:gap-12">
         <SideNavigation />
        <div className="py-1">{children}</div>
    </div>
}