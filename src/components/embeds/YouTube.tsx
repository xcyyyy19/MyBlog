import React from 'react'
import LazyLoad from "@/components/LazyLoad";

export interface YouTubeProps {
  /** YouTube id */
  videoId?: string
  /** YouTube Playlist id */
  playlistId?: string
  /** Aspect ratio of YouTube video */
  aspectRatio?: string
  /** Skip to a time in the video */
  skipTo?: {
    h?: number
    m: number
    s: number
  }
  /** Autoplay the video */
  autoPlay?: boolean
  /** No Cookie option */
  noCookie?: boolean
}

export const YouTube: React.FC<YouTubeProps> = ({
  videoId,
  playlistId,
  aspectRatio = '16 / 9',
  autoPlay = false,
  skipTo = { h: 0, m: 0, s: 0 },
  noCookie = false,
}) => {
  const { h, m, s } = skipTo

  const tH = h! * 60
  const tM = m * 60

  const startTime = tH + tM + s

  const provider = noCookie ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com'
  const baseUrl = `${provider}/embed/`
  const src = `${baseUrl}${
    videoId
      ? `${videoId}?&autoplay=${autoPlay}&start=${startTime}`
      : `&videoseries?list=${playlistId}`
  }`

  return (
    <LazyLoad className="relative w-full bg-zinc-500/10" style={{ aspectRatio }}>
      <iframe
        className="absolute left-0 top-0 w-full h-full"
        title={`YouTube-${videoId || playlistId}`}
        src={src}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </LazyLoad>
  )
}
