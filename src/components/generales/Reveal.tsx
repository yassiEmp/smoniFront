import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  defaultVisible?: boolean;
};

export const Reveal = ({ children, delay = 0, className, style, defaultVisible = false }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(defaultVisible);

  useEffect(() => {
    if (defaultVisible) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [defaultVisible]);

  return (
    <div
      ref={ref}
      data-immediate={defaultVisible ? "true" : undefined}
      className={`fade-blur-in${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={{
        ...style,
        ...(defaultVisible
          ? { animationDelay: delay ? `${delay}ms` : undefined }
          : { transitionDelay: delay ? `${delay}ms` : undefined }),
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
