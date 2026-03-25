export default function Logo({ white = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/assets/senai-azul.png"
        alt="SENAI"
        className={`h-14 w-auto flex-shrink-0 ${white ? 'brightness-0 invert' : ''}`}
      />
    </div>
  )
}
