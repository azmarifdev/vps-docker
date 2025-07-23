"use client";
import Dropdown from "./Dropdown";
import {useRouter} from "next/navigation";
import {useLogoutMutation} from "@/redux/api/authApi";
import {logout} from "@/redux/features/authSlice";

const Header = () => {
    const [logoutMutation] = useLogoutMutation();

    const router = useRouter();

    const handleLogout = async () => {
        await logoutMutation({});
        logout();
        router.push("/login");
    };

    return (
        <header className=" py-3 px-6 rounded-bl-[8px] rounded-br-[8px]  text-black bg-white sticky top-0 left-0 right-0 z-50 ">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold tracking-wider">Pickone</h2>
                <div className="flex items-center space-x-14">
                    <Dropdown handleLogout={handleLogout} />
                </div>
            </div>
        </header>
    );
};

export default Header;
