import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm, setSortBy } from '../store/cryptoSlice'

const SearchBar = () => {
  const dispatch = useDispatch()
  const { searchTerm, sortBy } = useSelector(state => state.crypto)

  // Handle search input changes
  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }

  // Handle sort selection changes
  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value))
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Cryptocurrencies
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by name or symbol..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>
        
        {/* Sort Dropdown */}
        <div className="sm:w-48">
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="rank">Rank</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
