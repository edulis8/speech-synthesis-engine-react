import { PlayingState } from '../lib/speech';

/*
 * Implement a component that provides basic UI options such as playing, 
pausing and loading new content
 * This component should have the following,
 * - A button with text "Play" if the player is not playing
 * - A button with text "Pause" if the player is playing
 * - A button with text "Load new content" that loads new content from the API
 */
export const Controls = ({
  play,
  pause,
  loadNewContent,
}: {
  play: () => void;
  pause: () => void;
  loadNewContent: () => void;
  state: PlayingState;
}) => {
  // TODO - use "state"
  return <div>
    <button onClick={play} type="button">Play</button>
    <button onClick={pause} type="button">Pause</button>
    <button onClick={loadNewContent} type="button">Load new content</button>
  </div>;
};
