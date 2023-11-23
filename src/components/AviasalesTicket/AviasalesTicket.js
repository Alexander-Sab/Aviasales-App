import clsx from 'clsx'
import { Spin } from 'antd'
import React, { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getTickets } from '../../services/AviasalesServices'
import AviasalesTicketList from '../AviasalesTicketList'
import { sortTickets, filterTickets } from '../../utils/utils'

import classes from './AviasalesTicket.module.scss'

export const AviasalesTicket = () => {
  const { tickets, error } = useSelector((state) => state.tickets)
  const [isTicketsLoading, setIsTicketsLoading] = useState(true)
  const selectedFilters = useSelector((state) => state.checkboxes)
  const selectedFilter = useSelector((state) => state.filters.selectedFilter)
  const [displayedTickets, setDisplayedTickets] = useState(5)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setIsTicketsLoading(true)
        await dispatch(getTickets())
      } catch (error) {
        console.error(error)
      } finally {
        setIsTicketsLoading(false)
      }
    }
    fetchTickets()
  }, [dispatch])

  const filteredAndSortedTickets = useMemo(() => {
    const filtered = filterTickets(tickets, selectedFilters)
    return sortTickets(filtered, selectedFilter)
  }, [tickets, selectedFilters, selectedFilter])
  const handleShowMoreTickets = () => {
    setDisplayedTickets((prevDisplayedTickets) => prevDisplayedTickets + 5)
  }
  function generateTicketId(ticket) {
    const { price, time, airline } = ticket
    const id = `${price}${time}${airline}`
    return id
  }

  return (
    <>
      {isTicketsLoading ? (
        <div className={clsx(classes['aviasales__ticket-large'])}>
          <Spin
            className={clsx(classes['aviasales__ticket-large__spin'])}
            size="large"
          />
        </div>
      ) : error ? (
        <div className={clsx(classes['aviasales__ticket-error'])}>
          <div
            className={clsx(
              classes['viasales__ticket-error__offline-icons'],
              classes.icons,
            )}
          ></div>
          <p className={clsx(classes['aviasales__ticket-error__offline-text'])}>
            Отсудствует интернет!
          </p>
        </div>
      ) : filteredAndSortedTickets.length === 0 &&
        Object.values(selectedFilters).every((filter) => !filter) ? (
        <div className={clsx(classes['aviasales__ticket-error'])}>
          <div
            className={clsx(
              classes['viasales__ticket-error__icons'],
              classes.icons,
            )}
          ></div>
          <p className={clsx(classes['aviasales__ticket-error__text'])}>
            К сожалению, билетов по вашему запросу не найдено. <br /> Попробуйте
            изменить параметры поиска или повторить позже.
          </p>
        </div>
      ) : (
        <>
          {filteredAndSortedTickets.slice(0, displayedTickets).map((ticket) => {
            const ticketId = generateTicketId(ticket)
            return <AviasalesTicketList ticket={ticket} key={ticketId} />
          })}
          <button
            className={clsx(classes['aviasales__show-more'])}
            onClick={handleShowMoreTickets}
          >
            показать еще 5 билетов!
          </button>
        </>
      )}
    </>
  )
}

export default AviasalesTicket
