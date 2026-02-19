export default function Card({ 
  children, 
  title,
  className = '', 
  variant = 'default',
  size = 'md',
  ...props 
}) {
  const base = `bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg hover:shadow-2xl transition-all duration-300 p-0 overflow-hidden`

  const variants = {
    default: 'ring-1 ring-slate-200/50 dark:ring-slate-700/50',
    elevated: 'shadow-2xl ring-2 ring-slate-200/30 dark:ring-slate-700/30',
    glass: 'bg-white/70 dark:bg-gray-800/60 backdrop-blur-2xl border-slate-200/30 dark:border-slate-700/30'
  }

  const sizes = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const padding = sizes[size] || sizes.md
  const selectedVariant = variants[variant] || variants.default

  return (
    <div className={`${base} ${selectedVariant} ${padding} ${className}`} {...props}>
      {title && (
        <div className="mb-6 pb-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h3>
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}
