import axios from 'axios'

const baseUrl = 'https://aviasales-test-api.kata.academy'

const generateTicketId = (ticket) => {
  const { price, time, airline } = ticket
  const id = `${price}-${time}-${airline}`
  return id
}

export const fetchTickets = () => async (dispatch) => {
  try {
    const searchIdResponse = await axios.get(`${baseUrl}/search`)
    const { searchId } = searchIdResponse.data
    let tickets = []
    let stop = false
    while (!stop) {
      try {
        const ticketsResponse = await axios.get(
          `${baseUrl}/tickets?searchId=${searchId}`,
        )
        const { tickets: newTickets, stop: newStop } = ticketsResponse.data
        const ticketsWithId = newTickets.map((ticket) => ({
          ...ticket,
          id: generateTicketId(ticket),
        }))
        tickets = [...tickets, ...ticketsWithId]
        stop = newStop
      } catch (error) {
        // Игнорирование ошибки net::ERR_CONNECTION_TIMED_OUT и ошибки с кодом 500
        if (error.code !== 'ECONNABORTED' && error.response.status !== 500) {
          throw error
        }
      }
    }
    //console.log('tickets:', tickets) // Вывод всех билетов в консоль
    dispatch({ type: 'FETCH_TICKETS_SUCCESS', payload: tickets })
  } catch (error) {
    dispatch({ type: 'FETCH_TICKETS_FAILURE', payload: error.message })
  }
}

export const getTickets = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_TICKETS_REQUEST' })
    await dispatch(fetchTickets())
    dispatch({ type: 'FETCH_TICKETS_COMPLETE' })
  } catch (error) {
    dispatch({ type: 'FETCH_TICKETS_ERROR', payload: error.message })
  }
}

export default getTickets
