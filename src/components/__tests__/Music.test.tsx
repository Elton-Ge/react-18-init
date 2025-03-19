import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { Music, musicData } from '../Music';

describe('Music Component', () => {
  beforeEach(() => {
    // Mock HTMLMediaElement methods
    window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
    window.HTMLMediaElement.prototype.pause = vi.fn();
    Object.defineProperty(window.HTMLMediaElement.prototype, 'currentTime', {
      writable: true,
      value: 0,
    });
    Object.defineProperty(window.HTMLMediaElement.prototype, 'duration', {
      writable: true,
      value: 180, // 3 minutes
    });
  });

  test('renders music player with initial state', () => {
    render(<Music />);
    
    // Check if the music library title is present
    expect(screen.getByText('Music Library')).toBeInTheDocument();
    
    // Check if all songs are rendered
    musicData.forEach((song) => {
      expect(screen.getByTestId(`song-item-${song.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`song-title-${song.id}`)).toHaveTextContent(song.title);
      expect(screen.getByTestId(`song-artist-${song.id}`)).toHaveTextContent(song.artist);
    });
    
    // Check initial "No song selected" state
    expect(screen.getByText('No song selected')).toBeInTheDocument();
  });

  test('plays a song when clicked', () => {
    render(<Music />);
    
    // Click the first song
    fireEvent.click(screen.getByTestId(`song-item-${musicData[0].id}`));
    
    // Check if play was called
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
    
    // Check if song details are displayed
    expect(screen.getByText(musicData[0].title)).toBeInTheDocument();
    expect(screen.getByText(musicData[0].artist)).toBeInTheDocument();
  });

  test('toggles play/pause when clicking play/pause button', () => {
    render(<Music />);
    
    // Click the first song to start playing
    fireEvent.click(screen.getByTestId(`song-item-${musicData[0].id}`));
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
    
    // Click play/pause button to pause
    const playPauseButton = screen.getByTestId('play-pause-button');
    fireEvent.click(playPauseButton);
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1);
    
    // Click play/pause button to resume
    fireEvent.click(playPauseButton);
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
  });

  test('updates progress bar during playback', () => {
    render(<Music />);
    
    // Click the first song
    fireEvent.click(screen.getByTestId(`song-item-${musicData[0].id}`));
    
    const audioElement = screen.getByTestId('audio-element');
    
    // Simulate time update
    Object.defineProperty(audioElement, 'currentTime', { value: 60 }); // 1 minute
    fireEvent.timeUpdate(audioElement);
    
    // Check if current time is updated
    expect(screen.getByTestId('current-time')).toHaveTextContent('1:00');
  });

  test('seeks to position when progress bar is clicked', () => {
    render(<Music />);
    
    // Click the first song
    fireEvent.click(screen.getByTestId(`song-item-${musicData[0].id}`));
    
    // Click progress bar
    const progressBar = screen.getByTestId('progress-bar');
    fireEvent.click(progressBar, {
      clientX: 100,
      currentTarget: {
        getBoundingClientRect: () => ({
          left: 0,
          width: 200,
        }),
      },
    });
    
    // Check if currentTime was updated (should be 90 seconds - half of 180s duration)
    const audioElement = screen.getByTestId('audio-element') as HTMLAudioElement;
    expect(audioElement.currentTime).toBe(90);
  });

  test('formats time correctly', () => {
    render(<Music />);
    
    // Click the first song
    fireEvent.click(screen.getByTestId(`song-item-${musicData[0].id}`));
    
    const audioElement = screen.getByTestId('audio-element') as HTMLAudioElement;
    
    // Test different time formats
    Object.defineProperty(audioElement, 'currentTime', { value: 61 }); // 1:01
    fireEvent.timeUpdate(audioElement);
    expect(screen.getByTestId('current-time')).toHaveTextContent('1:01');
    
    Object.defineProperty(audioElement, 'currentTime', { value: 0 }); // 0:00
    fireEvent.timeUpdate(audioElement);
    expect(screen.getByTestId('current-time')).toHaveTextContent('0:00');
  });
});
