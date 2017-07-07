export function convertByNow (time) {
  let lag = Date.now() - time
  time = new Date(time)
  const twoDays = 172800000
  const oneDay = 86400000
  const oneHour = 3600000
  const oneMinute = 60000
  const oneSecond = 1000
  if (lag > twoDays) return `${time.getMonth()}-${time.getDate()}`
  if (lag > oneDay) return '1天前'
  if (lag > oneHour) return parseInt(lag / oneHour) + '小时前'
  if (lag > oneMinute) return parseInt(lag / oneMinute) + '分前'
  if (lag > oneSecond) return parseInt(lag / oneSecond) + '秒前'
  else return '刚刚'
}
