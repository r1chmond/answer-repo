import { useState, useTransition } from "react";
import TabButton from "../tabs/TabButton";
import BlogPostTab from "../tabs/BlogPostTab";
import NavBar from "../components/NavBar";
import TextbookSolutionTab from "../tabs/TextbookSolutionTab";
import "../main.css";
import { useLocation } from "react-router-dom";

function HomePage() {
  const location = useLocation();
  const [isPending, startTransition] = useTransition();

  //if previous path is blog, then show blogs tab
  const [tab, setTab] = useState<string>(() => {
    const prevLocation = location.state?.from as string;
    return prevLocation === "blogpostPage" ? "blogpost" : "textbookSolutions";
  });

  function selectTab(nextTab: string): void {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  if (isPending) {
    return (
      <div className="d-flex justify-content-center">&#128336; Pending </div>
    );
  }
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <NavBar />
      </nav>
      <ul className="nav nav-tabs">
        <TabButton
          isActive={tab === "textbookSolutions"}
          onClick={() => selectTab("textbookSolutions")}
        >
          Textbook Solutions
        </TabButton>
        <TabButton
          isActive={tab === "blogpost"}
          onClick={() => selectTab("blogpost")}
        >
          Blog Posts
        </TabButton>
      </ul>

      {tab === "textbookSolutions" && <TextbookSolutionTab />}
      {tab === "blogpost" && <BlogPostTab />}
    </>
  );
}

export default HomePage;
