import React from 'react'

const CoinCard = ({ coin }) => {
  // Format price to show appropriate decimal places
  const formatPrice = (price) => {
    const numPrice = parseFloat(price)
    if (numPrice < 1) {
      return `$${numPrice.toFixed(6)}`
    } else if (numPrice < 100) {
      return `$${numPrice.toFixed(2)}`
    } else {
      return `$${numPrice.toLocaleString()}`
    }
  }

  // Format market cap for better readability
  const formatMarketCap = (marketCap) => {
    const num = parseFloat(marketCap)
    if (num >= 1e12) {
      return `$${(num / 1e12).toFixed(2)}T`
    } else if (num >= 1e9) {
      return `$${(num / 1e9).toFixed(2)}B`
    } else if (num >= 1e6) {
      return `$${(num / 1e6).toFixed(2)}M`
    } else {
      return `$${num.toLocaleString()}`
    }
  }

  // Determine color for 24h change
  const getChangeColor = (change) => {
    if (parseFloat(change) > 0) return 'text-green-500'
    if (parseFloat(change) < 0) return 'text-red-500'
    return 'text-gray-500'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        {/* Coin Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
            <img
              src={coin.iconUrl}
              alt={coin.name}
              className="w-8 h-8"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/32x32/4fd1c7/ffffff?text=${coin.symbol}`
              }}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{coin.name}</h3>
            <p className="text-sm text-gray-500">{coin.symbol}</p>
          </div>
        </div>
        
        {/* Rank Badge */}
        <div className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
          #{coin.rank}
        </div>
      </div>

      {/* Price and Change */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Price:</span>
          <span className="text-xl font-bold text-gray-800">
            {formatPrice(coin.price)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">24h Change:</span>
          <span className={`text-sm font-medium ${getChangeColor(coin.change)}`}>
            {coin.change > 0 ? '+' : ''}{parseFloat(coin.change).toFixed(2)}%
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Market Cap:</span>
          <span className="text-sm font-medium text-gray-800">
            {formatMarketCap(coin.marketCap)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CoinCard
