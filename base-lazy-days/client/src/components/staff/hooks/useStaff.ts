import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import type { Staff } from '@shared/types'

import { filterByTreatment } from '../utils'

import { axiosInstance } from '@/axiosInstance'
import { queryKeys } from '@/react-query/constants'

async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff')
  return data
}

export function useStaff(): {
  staff: Staff[]
  filter: string
  setFilter: (filter: string) => void
} {
  // for filtering staff by treatment
  const [filter, setFilter] = useState('all')
  const selectFn = useCallback(
    (unfilteredStaff: Staff[]) => {
      if (filter === 'all') return unfilteredStaff
      return filterByTreatment(unfilteredStaff, filter)
    },
    [filter]
  )
  const fallBack: Staff[] = []

  const { data: staff = fallBack } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
    select: selectFn,
  })

  // TODO: get data from server via useQuery

  return { staff, filter, setFilter }
}
