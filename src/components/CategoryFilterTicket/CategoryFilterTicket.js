import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'

import { setSelectedFilter } from '../../store/filtersSlice'

import classes from './CategoryFilterTicket.module.scss'

export const CategoryFilterTicket = () => {
  const filtersState = useSelector((state) => state.filters)
  const selectedFilter = filtersState?.selectedFilter || 'optimal'
  const dispatch = useDispatch()

  const handleFilterClick = (filter) => {
    dispatch(setSelectedFilter(filter))
  }

  return (
    <section className={clsx(classes.aviasales__tickets)}>
      <div
        className={clsx(
          classes['aviasales__ticket-category-filter'],
          classes['category-filter'],
        )}
      >
        <button
          className={clsx(
            classes['category-filter__option'],
            selectedFilter === 'cheapest' && classes.selected,
          )}
          onClick={() => handleFilterClick('cheapest')}
        >
          самый дешевый
        </button>
        <button
          className={clsx(
            classes['category-filter__option'],
            selectedFilter === 'fastest' && classes.selected,
          )}
          onClick={() => handleFilterClick('fastest')}
        >
          самый быстрый
        </button>
        <button
          className={clsx(
            classes['category-filter__option'],
            selectedFilter === 'optimal' && classes.selected,
          )}
          onClick={() => handleFilterClick('optimal')}
        >
          оптимальный
        </button>
      </div>
    </section>
  )
}
