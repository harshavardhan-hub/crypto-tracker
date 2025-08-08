import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCryptos } from '../store/cryptoSlice'
import CoinCard from './CoinCard'
import LoadingSpinner from './LoadingSpinner'
import SearchBar from './SearchBar'

const CoinList = () => {
  const dispatch = useDispatch()
  const { filteredCoins, isLoading, error } = useSelector(state => state.crypto)

  // Fetch data when component mounts
  useEffect(() => {
    dispatch(fetchCryptos())
  }, [dispatch])

  // Set up auto-refresh every minute
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchCryptos())
    }, 60000) // 60000ms = 1 minute

    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [dispatch])

  // Show loading spinner while fetching data
  if (isLoading && filteredCoins.length === 0) {
    return <LoadingSpinner />
  }

  // Show error message if API call fails
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-medium">Error loading cryptocurrency data:</p>
          <p>{error}</p>
          <button
            onClick={() => dispatch(fetchCryptos())}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar />
      
      {/* Show message if no coins match search */}
      {filteredCoins.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No cryptocurrencies found matching your search.
          </p>
        </div>
      )}

      {/* Display crypto cards in grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoins.map((coin) => (
          <CoinCard key={coin.uuid} coin={coin} />
        ))}
      </div>

      {/* Show loading indicator during refresh */}
      {isLoading && filteredCoins.length > 0 && (
        <div className="text-center mt-6">
          <p className="text-gray-500">Updating prices...</p>
        </div>
      )}
    </div>
  )
}

export default CoinList
