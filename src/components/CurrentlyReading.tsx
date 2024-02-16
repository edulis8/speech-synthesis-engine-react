/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it
 * however you want as long as the testID exists
 *
 * red text highlight each word when you are playing
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  let [startWord, endWord] = currentWordRange;

  if (sentences[currentSentenceIdx] && endWord === 0) {
    const initEndWordIndex = sentences[currentSentenceIdx].split(" ")[0].length;
    console.log({ initEndWordIndex });
    endWord = initEndWordIndex;
  }

  if (!sentences.length) {
    return <p>loading sentences 🤔...</p>;
  }

  if (sentences[currentSentenceIdx] === undefined) {
    return <p>please load more content...</p>;
  }

  return (
    <div data-testid="currently-reading" className="currently-reading">
      <p data-testid="current-sentence" className="currently-reading-text">
        <span>{sentences[currentSentenceIdx].slice(0, startWord)}</span>
        <span data-testid="current-word" className="currentword">
          {sentences[currentSentenceIdx].slice(startWord, endWord)}
        </span>
        <span>{sentences[currentSentenceIdx].slice(endWord)}</span>
      </p>
      <section className="container">
        {sentences.map((sentence, i) => (
          <span key={i}>{sentence} </span>
        ))}
      </section>
      {/* <section className="debug">
        <pre>
          <div>-------------</div>
          <code>
            <pre style={{ color: "red" }}>
              {sentences[currentSentenceIdx].slice(startWord, endWord + 1)}
            </pre>
          </code>
          <code>
            currentWordRange {startWord} {endWord}
          </code>
        </pre>
        <pre>
          <code>currentSentenceIdx {currentSentenceIdx}</code>
        </pre>
      </section> */}
    </div>
  );
};
