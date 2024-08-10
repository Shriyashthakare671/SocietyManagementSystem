import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./adminDashboard.css";
import AdminHome from '../home/adminHome'

export default function AdminDashboard() {
    return (
        <>
            <div className="adminDashboard">
                <Topbar />
                <div className="container">
                    <Sidebar />
                </div>
            </div>
            <div className="admin-home">
              <AdminHome/>
            </div>
          
       </>
    );
}
