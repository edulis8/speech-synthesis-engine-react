import { describe, expect, it } from "vitest";

import { act, renderHook } from "@testing-library/react";

import { useSpeech } from "../lib/useSpeech";

describe("useSpeech Test Suite", () => {
  it("should return current sentence idx and current word range as well as playback state", () => {
    
    // this test was failing due to
    // "TypeError: Cannot read properties of undefined (reading 'getVoices')"
    // provisional solution: Mock getVoices 
    window.speechSynthesis = {
      getVoices: () => [1],
    };

    const sentences = ["This is a sentence.", "This is another sentence."];
    const { result } = renderHook(() => useSpeech(sentences));
    expect(result.current.currentSentenceIdx).toBe(0);
    expect(result.current.currentWordRange).toEqual([0, 0]);
    expect(result.current.playbackState).toBe("paused");
  });
});
