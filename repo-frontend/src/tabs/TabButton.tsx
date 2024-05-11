import React, { ReactNode } from "react";

interface TabButtonProps {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  children,
  isActive,
  onClick,
}) => {
  return (
    <li className="nav-item">
      <a className={`nav-link ${isActive ? "active" : ""}`} onClick={onClick}>
        {children}
      </a>
    </li>
  );
};

export default TabButton;
