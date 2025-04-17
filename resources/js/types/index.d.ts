import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// Defines the structure for the video items
export interface BaseVideoData {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  uploadTime: string;
  views: number;
  author: string;
  videoUrl: string;
};

// Props for interactive mode
export interface InteractiveVideoPreviewProps  {
  mode: 'interactive';
  data: BaseVideoData;
  onVideoStart?: () => void;
  onVideoEnd?: () => void;
  onVideoResume?: () => void;
  onVideoSeek?: () => void;
};

// Props for static mode (callbacks are not allowed)
export interface StaticVideoPreviewProps {
  mode: 'static';
  data: BaseVideoData;
};
