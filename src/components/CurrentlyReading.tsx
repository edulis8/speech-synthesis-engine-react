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
import {useEffect} from 'react';
import { useSpeech } from "../lib/useSpeech";

export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number]; // which word we are on
  currentSentenceIdx: number; // which sentence we are on
  sentences: string[]; // all
}) => {

  const { playbackState, play, pause } = useSpeech(sentences);

  useEffect(() => {
    play(sentences[currentSentenceIdx]);
    console.log(currentSentenceIdx)
    console.log({currentWordRange})
  }, [currentSentenceIdx])

  // TODO
  // if sentences[currentSentenceIdx] -> play it
  // if word is in current word range, make it red
  return (
    <div data-testid="currently-reading">
      {sentences.map((sentence, i) => (
        <p key={i} data-testid="current-sentence">
          {sentence}
          <span style={{color: 'red'}} data-testid="current-word">
            {sentence.substring(currentWordRange[0], currentWordRange[1])}
          </span>
        </p>
      ))}
    </div>
  );
};
