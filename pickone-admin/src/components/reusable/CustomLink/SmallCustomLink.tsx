import React, {FC} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";

const style = {
    link: "w-full inline-flex items-center py-1.5 text-sm mb-1 px-6 hover:bg-[#eff0f4] rounded-[4px] text-[#464646] capitalize",
};

type NavLinkProps = {
    href: string;
    label: string;
};

const SmallCustomLink: FC<NavLinkProps> = ({href, label}) => {
    const pathname = usePathname();

    return (
        <Link href={href} passHref>
            <h3
                className={`${style.link} ${
                    pathname === href ? "bg-[#eff0f4] " : ""
                }`}>
                {label}
            </h3>
        </Link>
    );
};

export default SmallCustomLink;
