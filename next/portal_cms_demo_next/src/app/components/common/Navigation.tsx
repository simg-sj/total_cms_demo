"use client"

import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import LogoutIcon from "@/assets/images/icon/logout-icon.png";
import SimgLogo from "@/assets/images/logo/simg-white-logo.png";
import { useEffect, useState } from "react";
import { getThemeConfig } from "@/config/themeConfig";
import DashboardIcon from "@/assets/images/icon/dashboard-icon.png";
import ListIcon from "@/assets/images/icon/list-icon.png";
import UserIcon from "@/assets/images/icon/user-icon.png";
import MenuItem from "@/app/components/common/MenuItem";
import Image from "next/image";
import {useSession} from "next-auth/react";
import {signOutWithForm} from "@/app/serverActions/auth";

export default function Navigation() {
    const router = useRouter();
    const segment = useSelectedLayoutSegment();
    const {data } = useSession();
    const [themeConfig, setThemeConfig] = useState<Theme | null>(null);
    const [activeLink, setActiveLink] = useState<string | null>(null);
    useEffect(() => {
        if (data) {
            const {platform} = data.user;
            const config = getThemeConfig(platform);
            setThemeConfig(config);
            document.documentElement.setAttribute('data-theme', platform);
        }
    }, [data]);

    useEffect(() => {
        if (segment) {
            setActiveLink(`/${segment}`);
        }
    }, [segment]);

    const getMenuItems = (config: Theme): MenuItemType[] => {
        const baseItems = [
            { icon: DashboardIcon, label: "대시보드", link: config.menuItems.dashboard || "" },
            { icon: ListIcon, label: "리스트", link: config.menuItems.list },
            { icon: UserIcon, label: "마이페이지", link: config.menuItems.mypage },
        ];

        return baseItems.filter(item => item.link !== "");
    };

    const menuItems = themeConfig ? getMenuItems(themeConfig) : [];


    if (!themeConfig) {
        return null; // or a loading spinner
    }

    return (
        <div className="bg-main h-screen w-[100px] p-3 flex flex-col justify-between">
            <div>
                <Image src={themeConfig.logoSrc} alt="업체로고" className="mt-5 mb-14" priority={true}/>
                {menuItems.slice(0, -1).map((item, index) => (
                    <div key={index}>
                        <MenuItem
                            {...item}
                            isActive={activeLink === item.link}
                            onClick={() => setActiveLink(item.link)}
                        />
                    </div>
                ))}
            </div>
            <div>
                {menuItems.slice(-1).map((item, index) => (
                    <div key={index}>
                        <MenuItem
                            {...item}
                            isActive={activeLink === item.link}
                            onClick={() => setActiveLink(item.link)}
                        />
                    </div>
                ))}
                <form
                    action={signOutWithForm}
                    className={'px-1 py-2 flex  flex-col items-center my-5 cursor-pointer rounded-md hover:bg-white hover:bg-opacity-30'}>
                    <button className={'flex flex-col items-center'}>
                        <Image src={LogoutIcon} alt={"로그아웃"} width={35}/>
                        <div className="text-white text-sm mt-2">로그아웃</div>
                    </button>
                </form>
                <Image src={SimgLogo} alt="SIMG로고" className="mb-5 mt-14" priority={true}/>
            </div>
        </div>
    );
}