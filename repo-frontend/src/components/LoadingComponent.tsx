import { useEffect, useState } from "react";

const count = (int: number) => {
  return int + 1;
};

const Loading = () => {
  let [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressText = document.querySelector(".progress-text");
    if (progressText) {
      progressText.textContent = `Loading... ${progress}%`;
    }
    if (progress < 100) {
      const timeoutId = setTimeout(() => {
        setProgress((prevProgress) => count(prevProgress));
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [progress]);

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <div className="progress-text">Loading... 0%</div>
    </div>
  );
};

export default Loading;
