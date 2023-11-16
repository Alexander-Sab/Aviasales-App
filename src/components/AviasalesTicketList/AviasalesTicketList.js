import clsx from 'clsx'

import { formatDuration, formatTimeRange, formatStops } from '../../utils/utils'

import classes from './AviasalesTicketList.module.scss'

const TicketSection = ({ name, value }) => (
  <div className={clsx(classes['ticket__section-info'])}>
    <div className={clsx(classes['ticket__section-info--name'])}>{name}</div>
    <div className={clsx(classes['ticket__section-info--value'])}>{value}</div>
  </div>
)

export const AviasalesTicketList = ({ ticket }) => {
  const { segments, price, carrier } = ticket

  const [segment1, segment2] = segments

  const formattedTimeRange1 = formatTimeRange(segment1.date, segment1.duration)
  const formattedTimeRange2 = formatTimeRange(segment2.date, segment2.duration)

  const formattedDuration1 = formatDuration(segment1.duration)
  const formattedDuration2 = formatDuration(segment2.duration)

  const stopsText1 = formatStops(segment1.stops)
  const stopsText2 = formatStops(segment2.stops)

  return (
    <section className={clsx(classes.aviasales__ticket, classes.ticket)}>
      <div className={clsx(classes.ticket__header)}>
        <div className={clsx(classes.ticket__price)}>{price} Р</div>
        <img
          className={clsx(classes.ticket__img)}
          src={`https://pics.avs.io/99/36/${carrier}.png`}
          alt="Airline logo"
        />
      </div>
      <div className={clsx(classes.ticket__section)}>
        <TicketSection
          name={`${segment1.origin} – ${segment1.destination}`}
          value={formattedTimeRange1}
        />
        <TicketSection name="В пути" value={formattedDuration1} />
        <TicketSection name={stopsText1} value={segment1.stops.join(', ')} />
      </div>
      <div className={clsx(classes.ticket__section)}>
        <TicketSection
          name={`${segment2.origin} – ${segment2.destination}`}
          value={formattedTimeRange2}
        />
        <TicketSection name="В пути" value={formattedDuration2} />
        <TicketSection name={stopsText2} value={segment2.stops.join(', ')} />
      </div>
    </section>
  )
}
