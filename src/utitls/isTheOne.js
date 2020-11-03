/**
 * @desc   判断是否为邮箱地址
 * @param  {String}  str
 * @return {Boolean}
 */
const isEmail = (str) => {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str)
}

/**
 * @desc  判断是否为身份证号
 * @param  {String|Number} str
 * @return {Boolean}
 */
const isIdCard = (str) => {
  return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
}

/**
 * @desc   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */
const isPhoneNum = (str) => {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
}

/**
 * @desc   判断是否为URL地址
 * @param  {String} str
 * @return {Boolean}
 */
const isUrl = (str) => {
  return /[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/i.test(str)
}

/**
 * @desc   判断是否为Mobile
 * @param  {String} userAgent
 * @return {Boolean}
 */
const isMobile = (userAgent) => {
  let mobileList = userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return (mobileList !== null)
}

const isUndefinedAndNull = (object) => {
  return (object === undefined || object === null)
}

const isJSON = (str) => {
  if (typeof str === 'string') {
    try {
      var obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e)
      return false
    }
  }
}

export default {
  isEmail,
  isIdCard,
  isPhoneNum,
  isUrl,
  isMobile,
  isUndefinedAndNull,
  isJSON
}
