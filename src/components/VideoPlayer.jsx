import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Settings } from 'lucide-react';
import './VideoPlayer.css';

const VideoPlayer = ({ videoUrl, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('1080p');
  const [showSettings, setShowSettings] = useState(false);
  const [buffered, setBuffered] = useState(0);
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const updateBuffered = () => {
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('progress', updateBuffered);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('progress', updateBuffered);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const skip = (seconds) => {
    const video = videoRef.current;
    video.currentTime += seconds;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const hideControlsAfterDelay = () => {
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    hideControlsAfterDelay();
  };

  return (
    <div 
      ref={containerRef}
      className={`video-player ${isFullscreen ? 'fullscreen' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <button className="video-player__close" onClick={onClose}>×</button>
      
      <video
        ref={videoRef}
        className="video-player__video"
        src={videoUrl}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      <div className={`video-player__controls ${showControls ? 'visible' : ''}`}>
        <div className="progress-container">
          <div className="progress-bar" onClick={handleSeek}>
            <div 
              className="progress-buffered" 
              style={{ width: `${(buffered / duration) * 100}%` }}
            />
            <div 
              className="progress-filled" 
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
            <div 
              className="progress-handle" 
              style={{ left: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="controls-bottom">
          <div className="controls-left">
            <button onClick={togglePlay} className="control-btn">
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            <button onClick={() => skip(-10)} className="control-btn">
              <SkipBack size={20} />
            </button>
            
            <button onClick={() => skip(10)} className="control-btn">
              <SkipForward size={20} />
            </button>
            
            <div className="volume-control">
              <button onClick={toggleMute} className="control-btn">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
            </div>
            
            <div className="time-display">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <div className="controls-right">
            <div className="settings-control">
              <button 
                onClick={() => setShowSettings(!showSettings)} 
                className="control-btn"
              >
                <Settings size={20} />
              </button>
              
              {showSettings && (
                <div className="settings-menu">
                  <div className="setting-item">
                    <span>Calidad:</span>
                    <select 
                      value={quality} 
                      onChange={(e) => setQuality(e.target.value)}
                    >
                      <option value="4K">4K</option>
                      <option value="1080p">1080p</option>
                      <option value="720p">720p</option>
                      <option value="480p">480p</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <span>Velocidad:</span>
                    <select onChange={(e) => videoRef.current.playbackRate = e.target.value}>
                      <option value="0.5">0.5x</option>
                      <option value="1" selected>1x</option>
                      <option value="1.25">1.25x</option>
                      <option value="1.5">1.5x</option>
                      <option value="2">2x</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            
            <button onClick={toggleFullscreen} className="control-btn">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {!isPlaying && (
        <div className="video-player__overlay">
          <button onClick={togglePlay} className="play-overlay">
            <Play size={60} fill="white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;