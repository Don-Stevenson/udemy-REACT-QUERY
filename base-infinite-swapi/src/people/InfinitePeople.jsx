import InfiniteScroll from 'react-infinite-scroller'
import { useInfiniteQuery } from '@tanstack/react-query'

import { Person } from './Person'

const initialUrl = 'https://swapi.dev/api/people/'
const fetchUrl = async url => {
  const response = await fetch(url)
  return response.json()
}

export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    isFetching,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['sw-people'],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: lastPage => {
      return lastPage.next || undefined
    },
  })

  if (isLoading) {
    return <div className="loading">loading ...</div>
  }
  if (isError) {
    return <div className="error">Error: {error.toString()}</div>
  }
  return (
    <InfiniteScroll
      loadMore={() => {
        if (!isFetching) {
          fetchNextPage()
        }
      }}
      hasMore={hasNextPage}
    >
      {data?.pages.map(pageData => {
        return pageData.results.map(result => {
          return (
            <Person
              key={result.name}
              name={result.name}
              hairColor={result.hair_color}
              eyeColor={result.eye_color}
            />
          )
        })
      })}
    </InfiniteScroll>
  )
}
