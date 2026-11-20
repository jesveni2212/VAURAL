import { Fragment } from "react";

type SplitWordsProps = {
  /** Use "\n" for a line break. */
  text: string;
  delay?: number;
  stagger?: number;
  highlight?: string;
  highlightClassName?: string;
};

/**
 * Word-by-word entrance done in CSS (`.word-rise`), so it plays on load and the
 * text stays visible even if JavaScript never runs. Screen readers get the plain sentence.
 */
export function SplitWords({ text, delay = 0, stagger = 0.08, highlight, highlightClassName = "" }: SplitWordsProps) {
  const lines = text.split("\n").map((line) => line.split(" "));
  let index = 0;

  return (
    <>
      <span className="sr-only">{text.replace(/\n/g, " ")}</span>
      <span aria-hidden="true">
        {lines.map((words, lineIndex) => (
          <Fragment key={lineIndex}>
            {lineIndex > 0 ? <br /> : null}
            {words.map((word, wordIndex) => {
              const wordDelay = Number((delay + index++ * stagger).toFixed(2));
              const isHighlight = word === highlight;

              return (
                <Fragment key={wordIndex}>
                  {wordIndex > 0 ? " " : null}
                  <span data-word className={`word-rise ${isHighlight ? highlightClassName : ""}`} style={{ animationDelay: `${wordDelay}s` }}>
                    {word}
                  </span>
                </Fragment>
              );
            })}
          </Fragment>
        ))}
      </span>
    </>
  );
}
