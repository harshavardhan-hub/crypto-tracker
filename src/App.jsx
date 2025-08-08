import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Header from './components/Header'
import CoinList from './components/CoinList'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <CoinList />
      </div>
    </Provider>
  )
}

export default App
