 interface LoaderProps {
  size?: number;
  showText?: boolean;
}

const Loader = ({ size = 32, showText = true }: LoaderProps) => (
  <div className="flex flex-col items-center justify-center w-full h-full py-8">
    <svg
      className="animate-spin text-primary"
      viewBox="0 0 24 24"
      style={{ width: size, height: size }}
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
    {showText && (
      <span className="ml-3 text-primary font-semibold text-lg">Chargement...</span>
    )}
  </div>
);

export default Loader;