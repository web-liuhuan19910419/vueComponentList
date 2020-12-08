export default {
  bind (el, binding) {
    if (!binding.value) {
      window.$message.error('请确保复制内容为空')
      return
    }
    el.handler = () => {
      const textArea = document.createElement('textarea')
      textarea.readOnly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = el.binding
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea)
      // 选中并且复制
      textArea.select()
      textArea.setSelectionRange(0, textArea.value.length)
      const result = document.execCommand('copy')
      if (result) {
        window.vm.$message.success('复制成功')
      } else {
        window.vm.$message.error('复制失败')
      }
      document.body.removeChild(textArea)
    }
    el.addEventListner('click', el.handler) 
  },
  unbind (el) {
    el.removeEventListner('click', el.handler)
  }
}