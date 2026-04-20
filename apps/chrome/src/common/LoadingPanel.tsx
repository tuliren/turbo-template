import { FC } from 'react';

const LoadingPanel: FC = () => {
  return (
    <div className="flex items-center justify-center p-6">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default LoadingPanel;
