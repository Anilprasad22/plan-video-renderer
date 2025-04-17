import React, { useEffect, useState } from 'react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import VideoPreview from '@/components/VideoPreview';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Videos',
        href: '/videos',
    },
];

type VideoData = {
    id: string;
    thumbnailUrl: string;
    title: string;
    author: string;
    duration: string;
    views: number;
    videoUrl: string;
    uploadTime: string;
  };

export default function Videos() {
    const [search, setSearch] = useState('');
    const [videos, setVideos] = useState<VideoData[]>([]);
    const [isInteractive, setIsInteractive] = useState(true);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [isToastVisible, setIsToastVisible] = useState(false);
    
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const endpoint =
          search.length >= 3
            ? `/videos/search?query=${encodeURIComponent(search)}`
            : '/list-videos';
        
        fetch(endpoint).then((response) => response.json()).then((data) => {
            setVideos(data.data);
        });
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    if (search.length === 0 || search.length >= 3) {
      fetchVideos();
    }
  }, [search]);
    
    const showToast = (message: string) => {
        setToastMessage(message);
        setIsToastVisible(true);

        // Hide the toast automatically after 5 seconds
        setTimeout(() => {
        setIsToastVisible(false);
        }, 5000);
    };
    const handleVideoStart = () => {
        showToast('Video has started.');
      };
    
      const handleVideoEnd = () => {
        showToast('Video has ended.');
      };
    
      const handleVideoResume = () => {
        showToast('Video has resumed.');
      };
    
      const handleVideoSeek = () => {
        showToast('Video position has been changed.');
      };
    const handleCloseToast = () => {
        setIsToastVisible(false);
    };
    return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Videos" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="mb-4">
          <input
            type="text"
            className="w-full rounded-md border px-4 py-2 text-sm shadow-sm"
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Toast message */}
        {isToastVisible && toastMessage && (
            <div
            className={`fixed top-4 right-4 z-50 flex items-center p-4 bg-green-500 text-white rounded-lg shadow-lg transition-opacity duration-500 ease-in-out ${
              isToastVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div>
                <div className="font-semibold">Heads up!</div>
                <div>{toastMessage}</div>
            </div>
            <button
                onClick={handleCloseToast} // Button to close the toast manually
                className="ml-4 text-white font-bold"
            >
                X
            </button>
            </div>
        )}
        <div className="flex justify-end mb-4">
          <button
              onClick={() => setIsInteractive((prev) => !prev)}
              className="rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
          >
              Switch to {isInteractive ? 'Static' : 'Interactive'} Mode
          </button>
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {videos.length > 0  ? (
                videos.map((video) => (
                <div
                    key={video.id}
                    className="group dark:border-sidebar-border relative aspect-video w-full rounded-xl border"
                >
                    {isInteractive ? (
                        <VideoPreview
                            key={video.id}
                            mode="interactive"
                            data={video}
                            onVideoStart={handleVideoStart}
                            onVideoEnd={handleVideoEnd}
                            onVideoResume={handleVideoResume}
                            onVideoSeek={handleVideoSeek}
                        />
                        ) : (
                        <VideoPreview
                            key={video.id}
                            mode="static"
                            data={video}
                        />
                    )}
                </div>
                ))
            ) : (
                <>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <span>No matching videos found</span>
                </div>
                </>
            )} 
        </div>

        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        </div>
      </div>
    </AppLayout>
  );
}