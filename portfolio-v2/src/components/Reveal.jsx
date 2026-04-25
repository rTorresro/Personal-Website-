import { useReveal } from "../hooks/useReveal.js";

export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  style,
  children,
  ...props
}) {
  const [ref, visible] = useReveal();
  const composed = `reveal${visible ? " reveal-in" : ""}${
    className ? ` ${className}` : ""
  }`;

  return (
    <Tag
      ref={ref}
      className={composed}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
