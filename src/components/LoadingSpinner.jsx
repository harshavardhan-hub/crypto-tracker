import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent"></div>
      <span className="ml-4 text-lg text-gray-600">Loading crypto data...</span>
    </div>
  )
}

export default LoadingSpinner
