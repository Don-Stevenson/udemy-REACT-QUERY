import './App.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { InfinitePeople } from './people/InfinitePeople'
import { InfiniteSpecies } from './species/InfiniteSpecies'

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Infinite SWAPI</h1>
        <div style={{ display: 'flex' }}>
          <div>
            <h3>Species</h3>
            <InfiniteSpecies />
          </div>
          <div>
            <h3>People</h3>
            <InfinitePeople />
          </div>
        </div>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
