import React from "react";
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from "../../components/topbar/Topbar";
import OwnerHome from "../home/ownerHome";
import './ownerDashboard.css';

export default function OwnerDashboard() {
    return (
        <>
            <div className="onerDashboard">
                <Topbar />
                <div className="container">
                    <Sidebar />
                </div>
            <OwnerHome/>
            </div>


        </>
    );
}
