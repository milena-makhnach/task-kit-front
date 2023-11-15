import { FC } from "react";
import { Header } from "../widgets/Header";
import { Outlet } from "react-router-dom";

export const Layout: FC = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}