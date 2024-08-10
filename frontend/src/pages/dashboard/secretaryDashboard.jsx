import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import SecretaryHome from "../home/secretaryHome";

export default function secretaryDashboard() {
    return (
        <>
            <div className="secretaryDashboard">
                <Topbar />
                <div className="container">
                    <Sidebar />
                </div>
            </div>

            <SecretaryHome />

        </>
    );
}
