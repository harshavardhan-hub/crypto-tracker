import React from 'react'

const Header = () => {
  return (
    <header className="bg-primary text-white py-6 shadow-lg">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center">
          🚀 Crypto Price Tracker
        </h1>
        <p className="text-center mt-2 text-gray-300">
          Live cryptocurrency prices updated every minute
        </p>
      </div>
    </header>
  )
}

export default Header
