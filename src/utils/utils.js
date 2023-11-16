import { format, add } from 'date-fns'

import { MINUTES_IN_HOUR, STOPS_TEXT } from '../constants/constants'

export const formatDuration = (duration) => {
  const hours = Math.floor(duration / MINUTES_IN_HOUR)
  const minutes = duration % MINUTES_IN_HOUR
  return `${hours}ч ${minutes}м`
}

export const formatTimeRange = (date, duration) => {
  const departureTime = format(new Date(date), 'HH:mm')
  const arrivalTime = format(
    add(new Date(date), { minutes: duration }),
    'HH:mm',
  )
  return `${departureTime} – ${arrivalTime}`
}

export const formatStops = (stops) => {
  const count = stops.length
  return STOPS_TEXT[count] || `${count} пересадки`
}

export const sortTickets = (allTickets, sortBy) => {
  if (!sortBy || sortBy === 'none') {
    return allTickets
  }
  switch (sortBy) {
    case 'cheapest':
      return [...allTickets].sort((a, b) => a.price - b.price)
    case 'fastest':
      return [...allTickets].sort((a, b) => {
        const totalDurationA = a.segments.reduce(
          (acc, segment) => acc + segment.duration,
          0,
        )
        const totalDurationB = b.segments.reduce(
          (acc, segment) => acc + segment.duration,
          0,
        )
        return totalDurationA - totalDurationB
      })
    case 'optimal':
      return allTickets
    default:
      return allTickets
  }
}

export const filterTickets = (allTickets, activeFilters) =>
  allTickets.filter((ticket) => {
    const transfersCountForBothSegments = ticket.segments.map(
      (segment) => segment.stops.length,
    )
    if (
      activeFilters &&
      activeFilters.withoutTransfers &&
      transfersCountForBothSegments.every((count) => count === 0)
    ) {
      return true
    }
    if (
      activeFilters &&
      activeFilters.oneTransfer &&
      transfersCountForBothSegments.every((count) => count === 1)
    ) {
      return true
    }
    if (
      activeFilters &&
      activeFilters.twoTransfers &&
      transfersCountForBothSegments.every((count) => count === 2)
    ) {
      return true
    }
    if (
      activeFilters &&
      activeFilters.threeTransfers &&
      transfersCountForBothSegments.every((count) => count === 3)
    ) {
      return true
    }
    return false
  })
