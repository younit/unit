var utils = {
  formatterTime: (time) => {
    const date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const dateTime = year + '-' + month + '-' + day + ' ' + utils.checkLength(hour) + ':' + utils.checkLength(minutes) + ':' + utils.checkLength(seconds)
    // const dateTime = year + '-' + month + '-' + day
    return dateTime
  },
  checkLength: (str) => {
    str = str.toString()
    if (str.length < 2) {
      str = '0' + str
    }
    return str
  },
}
export default utils