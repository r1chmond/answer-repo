import { useState, useTransition } from "react";
import TabButton from "../tabs/TabButton";
import BlogPostTab from "../tabs/BlogPostTab";
import TextbookSolutionTab from "../tabs/TextbookSolutionTab";
import "../main.css";

function HomePage() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState<string>("textbookSolutions");

  function selectTab(nextTab: string): void {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  return (
    <>
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
