export default function Badge({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '', 
  ...props 
}) {
  // Base styles
  const base = `inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-all duration-200 select-none uppercase tracking-wide`

  // Professional variants with perfect contrast
  const variants = {
    default: 'bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200 shadow-sm',
    pending: 'bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-200 shadow-sm',
    resolved: 'bg-emerald-100 text-emerald-900 border-emerald-200 hover:bg-emerald-200 shadow-sm',
    error: 'bg-red-100 text-red-900 border-red-200 hover:bg-red-200 shadow-sm',
    success: 'bg-green-100 text-green-900 border-green-200 hover:bg-green-200 shadow-sm'
  }

  // Size variants
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm'
  }

  const selectedVariant = variants[variant] || variants.default
  const selectedSize = sizes[size] || sizes.md

  return (
    <span 
      className={`${base} ${selectedVariant} ${selectedSize} ${className}`} 
      {...props}
    >
      {children}
    </span>
  )
}
