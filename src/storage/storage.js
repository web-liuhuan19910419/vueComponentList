// Local Storage 相关操作.
const storage = {
  /**
   * @desc  设置Local Storage
   * @param {String} key
   * @param {Object} value
   * @param attributeObject.expires 单位分钟
   */
  setStorage: (key, value, attributeObject) => {
    const data = {
      value: value
    }
    if (attributeObject && attributeObject.expires) {
      let curTime = new Date().getTime()
      data.expires = curTime + attributeObject.expires * 60 * 1000
    }
    localStorage[key] = JSON.stringify(data)
  },

  /**
   * @desc  获取Local Storage相关数据
   * @param {String} key
   */
  getStorage: key => {
    const data = localStorage[key]
    if (!data || data === 'null') {
      return null
    }
    let obj
    try {
      obj = JSON.parse(data)
    } catch (e) {
      return null
    }

    if (obj.expires && new Date().getTime() > obj.expires) {
      return null
    } else return obj.value
  },
  /**
   * @desc  删除Local Storage相关数据
   * @param {String} key
   */
  removeStorage: key => {
    localStorage.removeItem(key)
  }
}

export default storage
