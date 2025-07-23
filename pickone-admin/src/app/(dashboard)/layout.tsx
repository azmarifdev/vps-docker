import React from "react";
import Sidebar from "../../components/shared/Sidebar/Sidebar";
import Header from "../../components/shared/Header/Header";
import {UserProvider} from "@/providers/UserProvider";

export default function DashboardLayouts({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <UserProvider>
            <div className="w-full flex min-h-screen ">
                {/* Sidebar */}
                <div className="w-[19rem] flex-shrink-0">
                    <Sidebar />
                </div>

                {/* Main content area */}
                <div className="flex-grow px-6 min-h-screen overflow-hidden">
                    <Header />
                    <div className="my-10 w-full">{children}</div>
                </div>
            </div>
        </UserProvider>
    );
}
