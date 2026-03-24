import { ReactNode } from "react";

interface PageTitleProps {
  children?: ReactNode;
  className?: string;
}

function PageTitle({ children, className }: PageTitleProps) {
  return (
    <h1
      className={`
        text-6xl md:text-8xl font-black italic tracking-tighter 
        bg-linear-to-b from-white to-gray-500 bg-clip-text text-transparent 
        mb-6 pr-[0.15em] select-none inline-block
        ${className}
      `}
    >
      {children || "NETTO"}
    </h1>
  );
}

export default PageTitle;
