import { PlayingState } from "../lib/speech";

/*
 * Implement a component that provides basic UI options such as playing, 
pausing and loading new content
 * This component should have the following,
 * - A button with text "Play" if the player is not playing
 * - A button with text "Pause" if the player is playing
 * - A button with text "Load new content" that loads new content from the API
 */
const PLAYING = "playing";

export const Controls = ({
  play,
  pause,
  loadNewContent,
  state,
}: {
  play: () => void;
  pause: () => void;
  loadNewContent: () => void;
  state: PlayingState;
}) => {
  return (
    <div className="controls">
      {state !== PLAYING && (
        <button onClick={play} type="button">
          Play
        </button>
      )}
      {state === PLAYING && (
        <button onClick={pause} type="button">
          Pause
        </button>
      )}
      <button onClick={loadNewContent} type="button">
        Load new content
      </button>
    </div>
  );
};
