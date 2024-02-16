import { useState } from "react";
import { PlayingState, createSpeechEngine } from "./speech";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const INITIALIZED = "initialized";
const PAUSED = "paused";
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);
  const [playbackState, setPlaybackState] = useState<PlayingState>(PAUSED);

  const options = {
    onBoundary: (e: SpeechSynthesisEvent) => {
      const newRange = [e.charIndex, e.charIndex + e.charLength];
      setCurrentWordRange(newRange);
    },
    onEnd: (e: SpeechSynthesisEvent) => {
      setCurrentSentenceIdx((prevSentenceIdx) => prevSentenceIdx + 1);
      setCurrentWordRange([0, 0]);
    },
    onStateUpdate: (state: PlayingState) => {
      // when loading more content, reset everything
      if (state === INITIALIZED) {
        setCurrentSentenceIdx(0);
        setCurrentWordRange([0, 0]);
      }
      setPlaybackState(state);
    },
  };

  const { play, pause, cancel, load } = createSpeechEngine(options);

  const customPlay = (text: string) => {
    load(text);
    play();
  };
  const customPause = () => {
    pause();
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play: customPlay,
    pause: customPause,
    cancel,
  };
};

export { useSpeech };

// currentSentence: sentences[currentSentenceIdx],
//     currentWord: sentences[currentSentenceIdx]?.substring(currentWordRange[0], currentWordRange[1]),
