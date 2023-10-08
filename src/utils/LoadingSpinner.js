const LoadingSpinner = ({ size = '10', color = "blue-500", className = "" }) => {
  return (
    <div className={`mt-2 flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-t-2 border-b-2 border-${color}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
