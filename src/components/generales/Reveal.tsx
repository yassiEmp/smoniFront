import { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  // Kept for API compatibility; Reveal is now stateless and always visible at FCP.
  defaultVisible?: boolean;
};

export const Reveal = ({ children, delay = 0, className, style }: Props) => {
  return (
    <div
      className={`fade-blur-in is-visible${className ? ` ${className}` : ""}`}
      style={{
        ...style,
        animationDelay: delay ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
