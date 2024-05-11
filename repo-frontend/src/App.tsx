import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Solution from "./components/Solution";
import { useState, useTransition, ReactElement } from "react";
import TabButton from "./tabs/TabButton";
import BlogPostTab from "./tabs/BlogPostTab";
import TextbookSolutionTab from "./tabs/TextbookSolutionTab";
import "./App.css";
import Book from "./components/Book";

function App() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState<string>("about");

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

export default App;

// export default function TabContainer(): ReactElement {

// }
