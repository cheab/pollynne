import React from 'react'

interface LogoTipoProps {
  className?: string
  variant?: 'garamond' | 'cormorant'
  light?: boolean
  sizeMain?: string
  sizeSub?: string
  align?: 'center' | 'right' | 'responsive'
}

export default function LogoTipo({ 
  className = '', 
  variant = 'garamond', 
  light = false,
  sizeMain = 'text-xl sm:text-2xl md:text-3xl',
  sizeSub = 'text-[1em] sm:text-[1.1em] md:text-[1.2em]',
  align = 'center'
}: LogoTipoProps) {
  const fontClass = variant === 'garamond' ? 'font-garamond' : 'font-cormorant'
  const textMainColor = light ? 'text-white' : 'text-dark'

  const alignClass = align === 'center'
    ? 'items-center text-center'
    : align === 'right'
    ? 'items-end text-right'
    : 'items-center text-center md:items-end md:text-right'

  return (
    <div className={`flex flex-col select-none w-fit ${alignClass} ${className}`}>
      {/* Top line: Pollynne Leite */}
      <span
        className={`${fontClass} font-semibold leading-none tracking-normal ${textMainColor} ${sizeMain}`}
      >
        Pollynne Leite
      </span>
      {/* Bottom line: Beauty */}
      <span
        className={`${fontClass} font-normal leading-none tracking-normal ${textMainColor} ${sizeSub} -mt-1 sm:-mt-2 pt-1`}
      >
        Beauty
      </span>
    </div>
  )
}
