/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { createFileRoute } from '@tanstack/react-router';
import React, { useState, useRef, useEffect } from 'react';

// Define music data types
interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: string;
  audioSrc: string;
}

// Sample music data
const musicData: Song[] = [
  {
    id: '3',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    cover: '/album-covers/dua-lipa.jpg',
    duration: '3:23',
    audioSrc: '/audio/song3.mp3',
  },
  {
    id: '4',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    cover: '/album-covers/the-weeknd.jpg',
    duration: '3:20',
    audioSrc: '/audio/song1.mp3',
  },
  {
    id: '5',
    title: 'Circles',
    artist: 'Post Malone',
    album: "Hollywood's Bleeding",
    cover: '/album-covers/post-malone.jpg',
    duration: '3:35',
    audioSrc: '/audio/song2.mp3',
  },
  {
    id: '6',
    title: "Don't Start Now",
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    cover: '/album-covers/dua-lipa.jpg',
    duration: '3:03',
    audioSrc: '/audio/song3.mp3',
  },
  {
    id: '7',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    cover: '/album-covers/harry-styles.jpg',
    duration: '2:54',
    audioSrc: '/audio/song1.mp3',
  },
  {
    id: '8',
    title: 'Bad Guy',
    artist: 'Billie Eilish',
    album: 'When We All Fall Asleep, Where Do We Go?',
    cover: '/album-covers/billie-eilish.jpg',
    duration: '3:14',
    audioSrc: '/audio/song2.mp3',
  },
];

export const Music = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlaySong = (song: Song) => {
    // If we're already playing this song, just toggle play/pause
    if (currentSong && currentSong.id === song.id) {
      togglePlayPause();
      return;
    }

    setCurrentSong(song);
    setIsPlaying(true);
    // Reset time when changing songs
    setCurrentTime(0);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    // Auto play next song
    playNextSong();
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const playPreviousSong = () => {
    if (!currentSong) return;

    const currentIndex = musicData.findIndex((song) => song.id === currentSong.id);
    const previousIndex = (currentIndex - 1 + musicData.length) % musicData.length;
    handlePlaySong(musicData[previousIndex]);
  };

  const playNextSong = () => {
    if (!currentSong) return;

    const currentIndex = musicData.findIndex((song) => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % musicData.length;
    handlePlaySong(musicData[nextIndex]);
  };

  // Effect to play/pause when isPlaying state changes or song changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentSong?.id, isPlaying]);
  console.log({ currentSong });

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">Music Player</h1>
      {/* Hidden audio element */}
      {/* // eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        ref={audioRef}
        src={currentSong?.audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Music List - Left Side */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-[600px] overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Music Library
          </h2>

          <div className="space-y-4">
            {musicData.map((song) => (
              //   eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div
                key={song.id}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${currentSong?.id === song.id ? 'bg-blue-50 dark:bg-blue-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}
                onClick={() => handlePlaySong(song)}
              >
                <img
                  src={song.cover}
                  alt={`${song.album} cover`}
                  className="w-12 h-12 rounded-md object-cover shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 truncate">
                    {song.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{song.artist}</p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{song.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Music Player - Right Side */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col">
          {currentSong ? (
            <>
              <div className="flex-1 flex flex-col items-center justify-center mb-8">
                <img
                  src={currentSong.cover}
                  alt={`${currentSong.album} cover`}
                  className="w-64 h-64 rounded-lg shadow-xl mb-8 object-cover"
                />

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {currentSong.title}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">
                    {currentSong.artist}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{currentSong.album}</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-md mb-4">
                  {/* // eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                  <div
                    className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden cursor-pointer"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                      style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Player Controls */}
                <div className="flex items-center justify-center space-x-6">
                  <button
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                    onClick={playPreviousSong}
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    className="bg-blue-600 dark:bg-blue-500 text-white rounded-full p-3 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? (
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 9v6m4-6v6"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </button>

                  <button
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                    onClick={playNextSong}
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 2.828a9 9 0 010-12.728"
                    />
                  </svg>
                </button>
                <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
                <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <svg
                className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                No song selected
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Select a song from the library to start playing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/music')({
  component: Music,
});
