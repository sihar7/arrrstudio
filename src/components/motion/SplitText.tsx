import { Fragment, type CSSProperties } from "react";

// Judul yang muncul per kata dari balik mask. Teks utuh tetap dibaca pembaca layar lewat aria-label.
export default function SplitText({
  text,
  as: Component = "h2",
  id,
  className,
  delay = 0,
}: {
  text: string;
  as?: "h1" | "h2" | "p";
  id?: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <Component id={id} aria-label={text} data-reveal className={className} style={{ "--delay": `${delay * 1000}ms` } as CSSProperties}>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span aria-hidden className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
            <span className="a-word inline-block" style={{ "--i": i } as CSSProperties}>
              {w}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Component>
  );
}
