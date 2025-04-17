import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { InteractiveVideoPreviewProps, StaticVideoPreviewProps } from './../types/index'; 

type VideoPreviewProps = InteractiveVideoPreviewProps | StaticVideoPreviewProps;

export default function VideoPreview(props: VideoPreviewProps) {
  const { data, mode } = props;
  const isInteractive = mode === 'interactive';
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [audioEnabledVideoId, setAudioEnabledVideoId] = useState<string | null>(null);
  
  // Fundtion to mute toggle the mute 
  const toggleMute = (videoId: string) => {
    if (videoRef.current) {
      const currentVideo = videoRef.current;
      const isMuted = currentVideo.muted;
      currentVideo.muted = !isMuted;
      setAudioEnabledVideoId(!isMuted ? null : videoId);
    }
  };

  // Function to Handle video play with timeout on hover
  const handleMouseEnter = () => {
    if (!isInteractive || !videoRef.current) return;

    // Delay before playing the video
    const timeout = setTimeout(() => {
      videoRef.current?.play();
      props.onVideoStart?.();
    }, 500); // 0.5 seconds delay

    setHoverTimeout(timeout);
  };
  
  // Function to Handle video pause and set back the thumbnail on mouse leave
  const handleMouseLeave = () => {
    if (!isInteractive || !videoRef.current) return;

    if (hoverTimeout) clearTimeout(hoverTimeout);
    videoRef.current.pause();
    videoRef.current.muted = true;
    setAudioEnabledVideoId(null);
    // videoRef.current.currentTime = 0; // Initially used to set the video position to 0 since we are using load() below this can be avoided
    videoRef.current.load();
    props.onVideoEnd?.();
  };

  // Used event listener to Handle play, resume, end and seek
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!isInteractive || !videoElement) return;

    const handlePlay = () => {
      if (videoElement.currentTime > 0 && !videoElement.paused) {
        props.onVideoResume?.();
      }
    };

    const handleSeeked = () => {
      props.onVideoSeek?.();
    };

    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('seeked', handleSeeked);

    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('seeked', handleSeeked);
    };
  }, [isInteractive, props]);

  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-sidebar-border/70 flex flex-col"
      {...(isInteractive && {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })}
    >
      {/* Video Card */}
      <div className="relative flex-shrink-0 w-full h-60"> {/* Set a fixed height for the video */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMute(data.id);
          }}
          className="absolute top-2 right-2 z-10 hidden rounded-full bg-white/80 p-1 text-black shadow-md transition group-hover:block"
        >
          {audioEnabledVideoId === data.id ? (
            <Volume2 className="h-4 w-4" />
          ) : (
            <VolumeX className="h-4 w-4" />
          )}
        </button>
        <video
          ref={videoRef}
          src={data.videoUrl}
          poster={data.thumbnailUrl}
          muted
          playsInline
          controls={isInteractive}
          preload="metadata"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Video Info Card */}
      <div className="bg-black text-white p-3 mt-2"> {/* Added mt-2 to provide space between the video and info */}
        <div className="flex gap-3 items-center">
          {/* Placeholder for Avatar */}
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300 dark:bg-gray-600" />

          <div className="flex flex-col overflow-hidden">
            {/* Title */}
            <h4 className="font-semibold text-white line-clamp-1">{data.title}</h4>

            {/* Author */}
            <span className="text-xs text-gray-400 line-clamp-1">{data.author}</span>
            <div className="flex space-x-2">
              <span className="text-xs text-gray-400">{data.views} views</span>
              <span className="text-xs text-gray-400">
                {new Date(data.uploadTime).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
