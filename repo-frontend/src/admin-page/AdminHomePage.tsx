import { useLocation } from "react-router-dom";
import TabButton from "../tabs/TabButton";
import AdminNavBar from "./components/AdminNavBar";
import { useState, useTransition } from "react";
import FeedTab from "./tabs/FeedTab";
import MaterialsTab from "./tabs/MaterialsTab";
import ScrollTopButton from "../components/ScrollTopButton";

const AdminHomePage = () => {
  const location = useLocation();
  const [isPending, startTransition] = useTransition();

  const [tab, setTab] = useState<string>(() => {
    const prevLocation = location.state?.from as string;
    return prevLocation === "materials" ? "materials" : "feed";
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
        <TabButton isActive={tab === "feed"} onClick={() => selectTab("feed")}>
          Feed
        </TabButton>
        <TabButton
          isActive={tab === "materials"}
          onClick={() => selectTab("materials")}
        >
          Materials
        </TabButton>
      </ul>

      {tab === "feed" && <FeedTab />}
      {tab === "materails" && <MaterialsTab />}
      <ScrollTopButton />
    </>
  );
};

export default AdminHomePage;
