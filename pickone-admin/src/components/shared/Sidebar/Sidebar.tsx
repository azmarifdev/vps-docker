"use client";
import {usePathname, useRouter} from "next/navigation";
import CustomLink from "../../reusable/CustomLink/CustomLink";
import {MdCategory, MdDashboard, MdReviews} from "react-icons/md";
import {TbLogout, TbMenuOrder} from "react-icons/tb";

import SmallCustomLink from "@/components/reusable/CustomLink/SmallCustomLink";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {SiProducthunt} from "react-icons/si";
import {useLogoutMutation} from "@/redux/api/authApi";
import {logout} from "@/redux/features/authSlice";

const Sidebar = () => {
    const pathname = usePathname();
    const [logoutMutation] = useLogoutMutation();

    const router = useRouter();

    const handleLogout = async () => {
        await logoutMutation({}).unwrap();
        logout();
        router.push("/login");
    };

    return (
        <div className="fixed capitalize  bg-[#F4F6FF] h-screen w-[19rem] overflow-hidden overflow-y-auto  scrollbar-overlay">
            <div className="px-4">
                <div className="flex items-center mb-6 justify-center  border-b-2 border-[#C0CED6] ">
                    {/* <Image
                        src={logo}
                        className="h-[100px] w-auto"
                        alt="avatar"
                    /> */}
                    <h1 className="text-2xl text-gray p-5 font-semibold tracking-wider">
                        Pickone
                    </h1>
                </div>

                <Accordion
                    type="multiple"
                    defaultValue={["item-1"]}
                    className="mt-5">
                    <CustomLink
                        href="/dashboard"
                        icon={MdDashboard}
                        label="Dashboard"
                    />
                    <CustomLink
                        href="/category"
                        icon={MdCategory}
                        label="Category"
                    />

                    <AccordionItem value="item-1">
                        <AccordionTrigger
                            className={` w-full py-1 mb-2 text-base !font-normal  px-4 hover:bg-[#E8EBF9] rounded-[4px] !no-underline ${
                                pathname.startsWith("/product/")
                                    ? "text-primary bg-[#E8EBF9]"
                                    : "text-black"
                            }`}>
                            <div className="flex items-center w-full">
                                <span className="mr-2.5">
                                    <SiProducthunt
                                        size={20}
                                        color={
                                            pathname.startsWith("/product/")
                                                ? "#155dfc"
                                                : "#212121"
                                        }
                                    />
                                </span>
                                Products
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <SmallCustomLink
                                href="/product/manage-product"
                                label="Manage Product"
                            />
                            <SmallCustomLink
                                href="/product/add-product"
                                label="Add Product"
                            />
                        </AccordionContent>
                    </AccordionItem>

                    <CustomLink
                        href="/orders"
                        icon={TbMenuOrder}
                        label="Orders"
                    />

                    <CustomLink
                        href="/reviews"
                        icon={MdReviews}
                        label="Reviews"
                    />

                    <button
                        onClick={handleLogout}
                        className={`mt-32 text-black w-full inline-flex items-center justify-between py-2 mb-6 text-base px-4 hover:bg-[#E8EBF9] rounded-[4px] ${
                            pathname == "" &&
                            "border-l-2 border-primary bg-[#212121]"
                        } mb-12 `}>
                        Logout
                        <TbLogout size={20} className="mr-3 font-semibold" />
                    </button>
                </Accordion>
            </div>
        </div>
    );
};

export default Sidebar;
