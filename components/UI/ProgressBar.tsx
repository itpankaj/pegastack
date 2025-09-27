interface ProgressBarProps {
  progress: number;
  className?: string;
}

const ProgressBar = ({ progress, className = '' }: ProgressBarProps) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div 
        className="bg-pega-blue h-2 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      >
        <div className="h-full bg-gradient-to-r from-pega-blue to-pega-light rounded-full"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
