const tableColumnType = {
  // 正常显示
  normal: 0,
  // 公共操作，尽可能使用这个
  public: 2,
  // 数字输入
  numberInput: 3,
  // 选择
  select: 4,
  // 输入
  input: 5,
  // 下拉菜单
  dropdown: 6,
  // 自动下拉菜单
  autoDropdown: 7,
  // 多数字输入
  moreNumberInput: 8,
  // 自定义 slot
  custom: 10
}

export default tableColumnType
