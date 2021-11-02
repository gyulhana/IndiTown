import moment from 'moment'

const calculateTime = (time) => {
  const t1 = moment(time, 'YYYY-MM-DD hh:mm')
  const t2 = moment()
  const m = moment.duration(t1.diff(t2))

  return `${Math.floor(m.asDays()).toString().padStart(2, '0')}일  ${Math.floor(
    m.asHours() % 24
  )
    .toString()
    .padStart(2, '0')}시  ${Math.floor(m.asMinutes() % 60)
    .toString()
    .padStart(2, '0')}분`
}

const checkExpired = (content) =>
  +calculateTime(JSON.parse(content.title).recruitmentDate).substr(0, 2) >= 0

export const TimeUtils = {
  calculateTime,
  checkExpired,
}
