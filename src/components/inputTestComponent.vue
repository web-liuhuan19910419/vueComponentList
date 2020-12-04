<template>
  <div class="list">
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="[item.checked ? 'active' : '']"
      @click="handleTimeChecked(index)">
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Children",
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      list: [
        { text: "09:00", checked: true },
        { text: "10:00", checked: false },
      ],
    };
  },
  computed: {},
  watch: {
    value(val) {
      // 监听value变化，及时响应
      this.list.forEach((el) => {
        if (el.text === val) {
          el.checked = true;
        } else {
          el.checked = false;
        }
      });
    },
  },
  mounted() {
    console.log(this.value)
    console.log(this.list)
  },
  methods: {
    handleTimeChecked(index) {
      // 向父组件发送input事件，修改value值
      this.$emit("input", this.list[index].text);
    },
  },
};
</script>

<style scoped>
.list {
  display: flex;
}
.list >div {
  width: 100px;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
  text-align: center;
  background: #fff;
  color: #000;
  cursor: pointer;
}
.list > div:active {
  background: red;
  color: #fff;
}

</style>