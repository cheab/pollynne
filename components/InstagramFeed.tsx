'use client'

import React from 'react'
import Image from 'next/image'

interface InstagramPost {
  id: string
  media_type: string
  media_url: string
  permalink: string
  caption?: string
  timestamp: string
}

interface InstagramFeedProps {
  posts: InstagramPost[]
  nickname?: string
}

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

export default function InstagramFeed({ posts, nickname = 'pollynne_beauty' }: InstagramFeedProps) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="py-16 md:py-24 px-4 bg-white overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-beige font-semibold mb-2 block">
            Redes Sociais
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-dark mb-4">
            Acompanhe no Instagram
          </h2>
          <a
            href={`https://instagram.com/${nickname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray hover:text-beige transition duration-300 font-medium text-sm md:text-base border border-beige/40 rounded-full px-4 py-2 bg-beige-light/10 hover:bg-beige-light/30 shadow-sm"
          >
            <InstagramIcon size={18} />
            <span>@{nickname}</span>
          </a>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-neutral-100 bg-neutral-900 transition-all duration-500 hover:-translate-y-1 block"
            >
              {/* Image with blur-up/scale hover */}
              <div className="relative w-full h-full">
                <Image
                  src={post.media_url}
                  alt={post.caption || 'Instagram Post'}
                  fill
                  className="object-cover transition-transform duration-500 scale-100 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </div>

              {/* Elegant Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10 text-white select-none">
                <div className="flex justify-end">
                  <span className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/20">
                    <InstagramIcon size={14} />
                  </span>
                </div>
                {post.caption && (
                  <p className="text-[10px] leading-relaxed line-clamp-4 font-body font-light text-neutral-200">
                    {post.caption}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
