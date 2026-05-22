import React from 'react'

interface ServiceCardProps {
  icon: string
  name: string
  description: string
  price: string
  duration?: string
}

export default function ServiceCard({
  icon,
  name,
  description,
  price,
  duration,
}: ServiceCardProps) {
  return (
    <div className="service-card group hover:border-dark/30 border border-transparent transition-all flex flex-col h-full">
      <div className="h-12 w-12 rounded-lg bg-beige mb-6 flex items-center justify-center text-2xl group-hover:bg-dark group-hover:text-beige transition-all">
        {icon}
      </div>
      <h3 className="font-display text-lg md:text-xl font-bold text-dark mb-3 group-hover:text-dark transition">
        {name}
      </h3>
      <p className="text-gray text-sm md:text-base mb-6 leading-relaxed flex-grow">
        {description}
      </p>
      <div className="flex justify-between items-center pt-4 border-t border-beige w-full whitespace-nowrap gap-4">
        <span className="text-sm text-gray font-medium">
          {price}
        </span>
        {duration && (
          <span className="text-xs text-gray/70 font-light tracking-wide">
            Duração: {duration}
          </span>
        )}
      </div>
    </div>
  )
}
