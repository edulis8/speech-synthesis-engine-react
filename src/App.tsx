import "./App.css";

import { useState, useEffect } from "react";
import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { useSpeech } from "./lib/useSpeech";
import { parseContentIntoSentences, fetchContent } from "./lib/content.ts";

// [] fetchContent: Fetch content from the API end point using a GET request.

// - [ ] parseContentIntoSentences: Parse the fetched content into sentences
//based on rules described above (please refrain from using DOMParser
//or any built-in libraries to parse the fetched content)

// - [ ] useSpeech: Hook that takes the current set of sentences and
//plays it using the speechEngine in speech.ts

// - [ ] UI: A Controls component that allows you to play,
//pause and fetch new content. A Currently Reading component that displays the currently read sentence and word.

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentWordRange, currentSentenceIdx, playbackState, play, pause } =
    useSpeech(sentences);

  useEffect(() => {
    (async () => {
      const result: any = await fetchContent();
      console.log({ result });
      const content = result.content;
      const sentences = parseContentIntoSentences(content);
      console.log({ sentences });
      setSentences(sentences);
    })();
  }, []);

  function parentPlay() {
    console.log(currentSentenceIdx);
    play(sentences[currentSentenceIdx]);
    console.log(currentSentenceIdx);
  }

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          currentWordRange={currentWordRange}
          currentSentenceIdx={currentSentenceIdx}
          sentences={sentences}
        />
      </div>
      <div>
        {/* state = "initialized" | "playing" | "paused" | "ended";  */}
        {/* loadNewContent={loadNewContent} */}
        <Controls play={parentPlay} pause={pause} state={playbackState} />
      </div>
    </div>
  );
}

export default App;
