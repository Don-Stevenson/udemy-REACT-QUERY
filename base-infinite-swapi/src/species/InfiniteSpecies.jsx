import InfiniteScroll from 'react-infinite-scroller'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Species } from './Species'

const initialUrl = 'https://swapi.dev/api/species/'
const fetchUrl = async url => {
  const response = await fetch(url)
  return response.json()
}

export function InfiniteSpecies() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['sw-species'],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: lastPage => lastPage.next || undefined,
  })

  if (isLoading) {
    return <div className="loading">loading ...</div>
  }

  if (isError) {
    return <div className="error"> Error: {error.toString()}</div>
  }

  return (
    <>
      {isFetching && <div className="loading">...</div>}
      <InfiniteScroll
        loadMore={() => {
          if (!isFetching) {
            return fetchNextPage()
          }
        }}
        hasMore={hasNextPage}
      >
        {data?.pages.map(pageData =>
          pageData.results.map(({ name, language, averageLifeSpan }) => (
            <Species
              key={name}
              name={name}
              language={language}
              averageLifespan={averageLifeSpan}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  )
}
