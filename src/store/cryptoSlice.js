import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCryptoData } from '../services/cryptoAPI'

// Async action to fetch crypto data from API
export const fetchCryptos = createAsyncThunk(
  'crypto/fetchCryptos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCryptoData()
      return response.data.coins
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Initial state of our crypto slice
const initialState = {
  coins: [], // Array to store cryptocurrency data
  filteredCoins: [], // Array for search results
  isLoading: false, // Loading state for UI
  error: null, // Error messages
  searchTerm: '', // Current search query
  sortBy: 'rank', // Current sorting method
}

// Redux slice that contains all crypto-related state and actions
const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    // Action to update search term and filter coins
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
      // Filter coins based on search term
      if (action.payload === '') {
        state.filteredCoins = state.coins
      } else {
        state.filteredCoins = state.coins.filter(coin =>
          coin.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(action.payload.toLowerCase())
        )
      }
    },
    // Action to sort coins by different criteria
    setSortBy: (state, action) => {
      state.sortBy = action.payload
      const sortedCoins = [...state.filteredCoins]
      
      switch (action.payload) {
        case 'name':
          sortedCoins.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'price':
          sortedCoins.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
          break
        case 'rank':
        default:
          sortedCoins.sort((a, b) => parseInt(a.rank) - parseInt(b.rank))
          break
      }
      
      state.filteredCoins = sortedCoins
    },
  },
  // Handle async actions (API calls)
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptos.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCryptos.fulfilled, (state, action) => {
        state.isLoading = false
        state.coins = action.payload.slice(0, 10) // Get top 10 coins
        state.filteredCoins = state.coins
        state.error = null
      })
      .addCase(fetchCryptos.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { setSearchTerm, setSortBy } = cryptoSlice.actions
export default cryptoSlice.reducer
