export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  className = '', 
  type = 'button',
  ...props 
}) {
  const base = `inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none shadow-sm hover:shadow-md active:scale-[0.98] border-0 select-none`

  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-500/30 text-sm',
    secondary: 'bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 focus:ring-slate-500/30 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/30 active:bg-red-700',
    ghost: 'text-slate-900 hover:bg-slate-100 hover:text-slate-700 focus:ring-slate-500/20 dark:text-slate-100 dark:hover:bg-slate-800'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm h-9 min-w-[80px]',
    md: 'px-4 py-2 text-sm h-10 min-w-[100px]',
    lg: 'px-6 py-3 text-base h-12 min-w-[120px]'
  }

  const selectedVariant = variants[variant] || variants.primary
  const selectedSize = sizes[size] || sizes.md

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${base} ${selectedVariant} ${selectedSize} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
      ) : null}
      {loading ? 'Loading...' : children}
    </button>
  )
}
