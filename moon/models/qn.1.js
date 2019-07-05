const qiniu = require('qiniu')
const foridable = require('formidable')
let config = {
  accessKey: 'tyDdXJqI9tXNqnQbHiwCMLvwlVovEUzAJLxxj93s',
  secretKey: 'c5AHPMBuLuajncSk27CiVN0H8E6TShec956uVkGk',
  bucket: 'huaxiaohong',
  url: 'http://mziu.club',
}
let qn = {}
let bucket = config.bucket
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

qn.upImg = (req, cb) => {
  let cbObj = {}
  let form = new foridable.IncomingForm()
  form.encoding = 'utf-8'
  form.keepExtensions = true
  form.maxFields = 5 * 1024 * 1024
  form.parse(req, (err, fields, files) => {
    if (err) {
      cbObj.status = 1
      cbObj.msg = err
      return callback(cbObj)
    }
    let token = qn.uptoken(bucket) //  上传token
    let key = Math.random()
    let filePath = files.file.path //  本地路径

    let config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z2
    let formUploader = new qiniu.form_up.FormUploader(config)
    let putExtra = new qiniu.form_up.PutExtra()
    formUploader.putFile(token.token, key, filePath, putExtra, (respErr, respBody, respInfo) => {
      if (respErr) {
        cbObj.status = 1
        cbObj.msg = respErr
        return callback(cbObj)
      }
      if (respInfo.statusCode === 200) {
        console.log(respBody)
        let response = {
          'url': config.url
        }
        cbObj.status = 0
        cbObj.data = response
        return callback(cbObj)
      } else {
        cbObj.status = 1
        cbObj.msg = respBody
        return callback(cbObj)
      }
    })
  })
}
module.exports = qn