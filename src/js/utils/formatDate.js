import { MONTHS } from '../constants/constants'

export default function formatDate(date) {
  let year = date.slice(0, 4)
  let month = date.slice(5, 7)
  let day = date.slice(8, 10)

  return `${day} ${MONTHS[month]} ${year}`
}