import { render, screen, fireEvent, act } from '@testing-library/react';
import { Music, musicData } from '../Music';
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

// Mock the HTMLMediaElement API
window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn().mockImplementation(() => {});

// Mock functions to track audio element events

// Helper to create a mock audio element
const createMockAudioElement = () => {
  const original = window.HTMLMediaElement.prototype;

  // Save original properties
  const originalCurrentTime = Object.getOwnPropertyDescriptor(original, 'currentTime');
  const originalDuration = Object.getOwnPropertyDescriptor(original, 'duration');

  // Mock properties
  Object.defineProperty(window.HTMLMediaElement.prototype, 'currentTime', {
    get: function () {
      return this._currentTime || 0;
    },
    set: function (value) {
      this._currentTime = value;
      if (this.ontimeupdate) this.ontimeupdate();
    },
    configurable: true,
  });

  Object.defineProperty(window.HTMLMediaElement.prototype, 'duration', {
    get: function () {
      return this._duration || 60;
    },
    set: function (value) {
      this._duration = value;
    },
    configurable: true,
  });

  return () => {
    // Restore original properties
    if (originalCurrentTime) {
      Object.defineProperty(window.HTMLMediaElement.prototype, 'currentTime', originalCurrentTime);
    }
    if (originalDuration) {
      Object.defineProperty(window.HTMLMediaElement.prototype, 'duration', originalDuration);
    }
  };
};

describe('Music Component', () => {
  let restoreAudio: () => void;

  beforeEach(() => {
    vi.clearAllMocks();
    restoreAudio = createMockAudioElement();
  });

  afterEach(() => {
    restoreAudio();
  });

  test('renders music player with library', () => {
    render(<Music />);

    // Check if the component renders correctly
    expect(screen.getByText('Music Player')).toBeInTheDocument();
    expect(screen.getByText('Music Library')).toBeInTheDocument();
    expect(screen.getByText('No song selected')).toBeInTheDocument();

    // Check if all songs are listed
    musicData.forEach((song) => {
      expect(screen.getByText(song.title)).toBeInTheDocument();
      expect(screen.getByText(song.artist)).toBeInTheDocument();
    });
  });

  test('selects and plays a song when clicked', async () => {
    render(<Music />);

    // Click on the first song
    fireEvent.click(screen.getByText(musicData[0].title));

    // Check if the song details are displayed
    expect(screen.getByText(musicData[0].title)).toBeInTheDocument();
    expect(screen.getByText(musicData[0].artist)).toBeInTheDocument();
    expect(screen.getByText(musicData[0].album)).toBeInTheDocument();

    // Check if play was called
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
  });

  test('toggles play/pause when button is clicked', async () => {
    render(<Music />);

    // First select a song
    fireEvent.click(screen.getByText(musicData[0].title));

    // Play button should have been called automatically
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);

    // Find and click the play/pause button (it's now in pause state)
    const playPauseButton = screen.getByRole('button', { name: '' });
    fireEvent.click(playPauseButton);

    // Pause should be called
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1);

    // Click again to resume playing
    fireEvent.click(playPauseButton);

    // Play should be called again
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
  });

  test('plays next song when next button is clicked', async () => {
    render(<Music />);

    // Select the first song
    fireEvent.click(screen.getByText(musicData[0].title));

    // Find and click the next button
    const nextButton = screen.getByRole('button', { name: '' });
    const buttons = screen.getAllByRole('button');
    const nextButtonIndex = buttons.findIndex((button) => button === nextButton);
    fireEvent.click(buttons[nextButtonIndex + 1]); // Next button is after play/pause

    // Check if the second song is now playing
    expect(screen.getByText(musicData[1].title)).toBeInTheDocument();
    expect(screen.getByText(musicData[1].artist)).toBeInTheDocument();
    expect(screen.getByText(musicData[1].album)).toBeInTheDocument();
  });

  test('plays previous song when previous button is clicked', async () => {
    render(<Music />);

    // Select the second song first
    fireEvent.click(screen.getByText(musicData[1].title));

    // Find and click the previous button
    const prevButton = screen.getByRole('button', { name: '' });
    const buttons = screen.getAllByRole('button');
    const prevButtonIndex = buttons.findIndex((button) => button === prevButton);
    fireEvent.click(buttons[prevButtonIndex - 1]); // Prev button is before play/pause

    // Check if the first song is now playing
    expect(screen.getByText(musicData[0].title)).toBeInTheDocument();
    expect(screen.getByText(musicData[0].artist)).toBeInTheDocument();
    expect(screen.getByText(musicData[0].album)).toBeInTheDocument();
  });

  test('handles song end and plays next song', async () => {
    render(<Music />);

    // Select the first song
    fireEvent.click(screen.getByText(musicData[0].title));

    // Get the audio element
    const audioElement = screen.getByTestId('audio-element');

    // Simulate ended event
    act(() => {
      audioElement.dispatchEvent(new Event('ended'));
    });

    // Check if the second song is now playing
    expect(screen.getByText(musicData[1].title)).toBeInTheDocument();
    expect(screen.getByText(musicData[1].artist)).toBeInTheDocument();
    expect(screen.getByText(musicData[1].album)).toBeInTheDocument();
  });
});
