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
  test: () => {
    console.log(1)
  },
  checkLength: (str) => {
    str = str.toString()
    if (str.length < 2) {
      str = '0' + str
    }
    return str
  },
  /**
   * @method 获取七牛云的上传凭证
   * @param { String } bucket 七牛云空间名称
   */
  getToken: (bucket, qiniutoken) => {
   qiniutoken({ bucket: bucket }).then(res => {
      let { code, data, msg } = res.data
      if (code === 200) {
        const qiniu = {
          token: data.token,
          uploadUrl: data.url
        }
        return qiniu
      } else {
        this.$message(msg)
      }
    })
  },
  toolbarOptions:[
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction

    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image', 'video'],
    ['clean']                                         // remove formatting button
  ]
}
export default utils