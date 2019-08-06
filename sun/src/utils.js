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
  getImgToBase64: (file) => {
    return new Promise( (resolve) => {
      let files = {}
      files.imageUrl = URL.createObjectURL(file.raw) // 图片预览
      let reader = new FileReader() //  生成文件读取
      reader.readAsDataURL(file.raw) //  转化文件数据流链接
      reader.onload =  function () {
        files.img = reader.result //  拿到base64结果
        resolve(files)
      }
     
    })
  },
}
export default utils