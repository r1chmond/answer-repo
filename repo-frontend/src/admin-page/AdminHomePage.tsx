import { useLocation } from "react-router-dom";
import TabButton from "../tabs/TabButton";
import AdminNavBar from "./components/AdminNavBar";
import { useState, useTransition } from "react";
import MaterialsTab from "./tabs/MaterialsTab";
import ScrollTopButton from "../components/ScrollTopButton";
import DashboardTab from "./tabs/DashboardTab";

const AdminHomePage = () => {
  const location = useLocation();
  const [isPending, startTransition] = useTransition();

  const [tab, setTab] = useState<string>(() => {
    const prevLocation = location.state?.from as string;
    return prevLocation === "materialsPage" ? "materials" : "dashboard";
  });

  const selectTab = (nextTab: string): void => {
    startTransition(() => {
      setTab(nextTab);
    });
  };

  if (isPending) {
    return (
      <div className="d-flex justify-content-center">&#128336; Pending </div>
    );
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <AdminNavBar />
      </nav>
      <ul className="nav nav-tabs">
        <TabButton
          isActive={tab === "dashboard"}
          onClick={() => selectTab("dashboard")}
        >
          Dashboard
        </TabButton>
        <TabButton
          isActive={tab === "materials"}
          onClick={() => selectTab("materials")}
        >
          Site Materials
        </TabButton>
      </ul>

      {tab === "dashboard" && <DashboardTab />}
      {tab === "materials" && <MaterialsTab />}
      <ScrollTopButton />
    </>
  );
};

export default AdminHomePage;
