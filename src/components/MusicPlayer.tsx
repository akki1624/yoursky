import { useEffect, useRef, useState } from 'react'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.35)
  const [minimized, setMinimized] = useState(true)
  const [currentSongName, setCurrentSongName] = useState('')

  const audioRef = useRef<HTMLAudioElement | null>(null)

  // SONG LIST
  const songs = [
  {
    name: 'Pal Pal Dil Ke Paas',
    src: '/music/palpal.mp3',
  },
  {
    name: 'Tu Tu Hai Vahi',
    src: '/music/tutuhai.mp3',
  },
  {
    name: 'Chhu Kar Mere Mann Ko',
    src: '/music/chhukar.mp3',
  },
  
  ]

  const getRandomSong = () => {
    return songs[Math.floor(Math.random() * songs.length)]
  }

  const playRandomSong = async () => {
    const audio = audioRef.current
    if (!audio) return

    const randomSong = getRandomSong()

    audio.src = randomSong.src
    audio.volume = volume

    setCurrentSongName(randomSong.name)

    try {
      await audio.play()
      setPlaying(true)
    } catch {
      // autoplay may fail
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const update = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration)
      }
    }

    audio.addEventListener('timeupdate', update)

    return () => {
      audio.removeEventListener('timeupdate', update)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // FIRST RANDOM SONG
    playRandomSong()

    // NEW RANDOM SONG AFTER ENDING
    audio.addEventListener('ended', playRandomSong)

    // AUTOPLAY FALLBACK
    const handleFirstInteraction = () => {
      if (audio.paused) {
        playRandomSong()
      }

      window.removeEventListener('click', handleFirstInteraction)
    }

    window.addEventListener('click', handleFirstInteraction)

    return () => {
      audio.removeEventListener('ended', playRandomSong)
      window.removeEventListener('click', handleFirstInteraction)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().catch(() => {})
      setPlaying(true)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current

    if (!audio || !audio.duration) return

    const val = parseFloat(e.target.value)

    audio.currentTime = val * audio.duration
    setProgress(val)
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-40 transition-all duration-500"
      style={{
        animation: 'fadeInUp 0.6s ease-out',
      }}
    >
      <audio ref={audioRef} />

      {minimized ? (
        <button
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300 group"
          style={{
            background: 'rgba(13,5,32,0.9)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(168,85,247,0.3)',
            boxShadow: '0 4px 20px rgba(168,85,247,0.2)',
          }}
        >
          <div
            className={`w-8 h-8 rounded-full vinyl ${
              playing ? 'vinyl-spin' : ''
            } flex items-center justify-center`}
            style={{
              boxShadow: playing
                ? '0 0 12px rgba(168,85,247,0.5)'
                : 'none',
              minWidth: '32px',
            }}
          >
            <span className="text-xs">🎵</span>
          </div>

          <span
            className="text-xs font-body truncate max-w-[120px]"
            style={{
              color: '#c084fc',
            }}
          >
            {currentSongName}
          </span>
        </button>
      ) : (
        <div
          className="rounded-2xl p-4 w-72"
          style={{
            background: 'rgba(8, 3, 20, 0.45)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(168,85,247,0.3)',
            boxShadow: '0 8px 40px rgba(168,85,247,0.2)',
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-12 h-12 rounded-full vinyl flex items-center justify-center flex-shrink-0 ${
                playing ? 'vinyl-spin' : ''
              }`}
              style={{
                boxShadow: playing
                  ? '0 0 16px rgba(168,85,247,0.6)'
                  : '0 0 8px rgba(168,85,247,0.2)',
              }}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, #c084fc, #7c3aed)',
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <p
                className="font-serif text-sm truncate"
                style={{
                  color: '#e9d5ff',
                }}
              >
                {currentSongName}
              </p>

              <p
                className="font-body text-xs truncate"
                style={{
                  color: 'rgba(196,181,253,0.5)',
                }}
              >
                Playing in shuffle mode
              </p>
            </div>

            <button
              onClick={() => setMinimized(true)}
              className="text-purple-400 hover:text-purple-200 transition-colors text-xs"
            >
              −
            </button>
          </div>

          {/* Progress */}
          <div className="mb-3">
            <input
              type="range"
              min="0"
              max="1"
              step="0.001"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(90deg, #a855f7 ${
                  progress * 100
                }%, rgba(168,85,247,0.2) ${progress * 100}%)`,
                accentColor: '#a855f7',
              }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: playing
                  ? 'rgba(168,85,247,0.3)'
                  : 'linear-gradient(135deg, #7c3aed, #ec4899)',

                border: '1px solid rgba(168,85,247,0.4)',

                boxShadow: playing
                  ? '0 0 16px rgba(168,85,247,0.4)'
                  : 'none',

                color: 'white',
                fontSize: '1rem',
              }}
            >
              {playing ? '⏸' : '▶'}
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <span className="text-xs">🔊</span>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) =>
                  setVolume(parseFloat(e.target.value))
                }
                className="w-16 h-1 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(90deg, #a855f7 ${
                    volume * 100
                  }%, rgba(168,85,247,0.2) ${volume * 100}%)`,

                  accentColor: '#a855f7',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}