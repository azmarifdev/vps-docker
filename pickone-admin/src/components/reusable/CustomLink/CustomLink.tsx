import React, {FC} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {IconType} from "react-icons";

const style = {
    link: "w-full inline-flex items-center py-1.5 mb-1 text-base px-4 hover:bg-[#E8EBF9] rounded-[4px] text-black capitalize",
};

type NavLinkProps = {
    href: string;
    icon: IconType;
    label: string;
};

const CustomLink: FC<NavLinkProps> = ({href, icon: Icon, label}) => {
    const pathname = usePathname();

    return (
        <Link href={href} passHref>
            <h3
                className={`${style.link} ${
                    pathname === href ? "bg-[#E8EBF9] text-primary" : ""
                }`}>
                <Icon
                    size={20}
                    className={`mr-2 ${
                        pathname === href ? "text-primary" : ""
                    }`}
                />
                {label}
            </h3>
        </Link>
    );
};

export default CustomLink;
