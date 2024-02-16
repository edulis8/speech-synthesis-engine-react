import { useState } from "react";

import { PlayingState, createSpeechEngine } from "./speech";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");
  const options = {
    onBoundary: (e: SpeechSynthesisEvent) => {
      console.log('onBoundary', e); // gen range
    },
    onEnd: (e: SpeechSynthesisEvent) => {
      console.log(e);
      const next = currentSentenceIdx + 1;
      // TODO update current word range
      e.charIndex
      e.charLength
      const newRange = [e.charIndex, e.charIndex + e.charLength];
      setCurrentSentenceIdx(next);
      setCurrentWordRange(newRange);
    },
    onStateUpdate: (state: PlayingState) => {
      console.log(state);
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
  };
};

export { useSpeech };

// currentSentence: sentences[currentSentenceIdx],
//     currentWord: sentences[currentSentenceIdx]?.substring(currentWordRange[0], currentWordRange[1]),
