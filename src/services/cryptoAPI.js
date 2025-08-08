import axios from 'axios'

// API configuration
const API_CONFIG = {
  baseURL: 'https://coinranking1.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST,
  }
}

// Create axios instance with configuration
const cryptoAPI = axios.create(API_CONFIG)

// Function to fetch cryptocurrency data
export const fetchCryptoData = async () => {
  try {
    const response = await cryptoAPI.get('/coins', {
      params: {
        limit: 10, // Get top 10 cryptocurrencies
        orderBy: 'marketCap', // Order by market cap
        orderDirection: 'desc', // Descending order
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching crypto data:', error)
    throw new Error('Failed to fetch cryptocurrency data')
  }
}
