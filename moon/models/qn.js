const qiniu = require('qiniu')
const foridable = require('formidable')
let config = {
  accessKey: 'tyDdXJqI9tXNqnQbHiwCMLvwlVovEUzAJLxxj93s',
  secretKey: 'c5AHPMBuLuajncSk27CiVN0H8E6TShec956uVkGk',
  url: 'http://mziu.club/',
}
let qn = {}
qn.uptoken = (bucket) => {
  let putPolicy = new qiniu.rs.PutPolicy({ scope: bucket })
  let ac = config.accessKey
  let sc = config.secretKey
  let mac = new qiniu.auth.digest.Mac(ac, sc)
  let uploadToken = putPolicy.uploadToken(mac)
  let data =  {
    'token': uploadToken,
    'url': config.url
  }
  return data
}

module.exports = qn