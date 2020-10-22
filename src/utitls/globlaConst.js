const globalConst = {
  headerHeight: 45, // 头部固定的高度
  sideMenuWidth: 300, // 侧边栏的固定宽度
  clientWidth: () => { // 获取电脑浏览器的可见宽度
    return document.documentElement.clientWidth
  },
  clientHeight: () => { // 获取电脑浏览器可见的高度
    return document.documentElement.clientHeight
  },
  getShowSideMenuHeight () { // 计算侧边栏的高度函数
    return this.clientHeight() - this.headerHeight
  },
  getShowPageMenuHeight () { // 计算主页面高度函数
    return this.clientHeight() - this.headerHeight
  }
}
export default globalConst