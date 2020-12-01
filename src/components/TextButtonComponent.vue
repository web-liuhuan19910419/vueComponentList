<template>
  <div>
    <p :class="styles" @click="ClickHandler">{{text}}</p>
  </div>
</template>

<script>
export default {
  name: 'TextButtonComponent',
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'normal'
    }
  },
  methods: {
    ClickHandler () {}
  },
  computed: {
    styles: {
      get() {return [this.type]}
    }
  }
}
</script>

<style scoped>
  p {
    font-size: 14px;
  }
  .normal {
    color: #409eff;
    font-weight: 400;
  }
  .normal:hover {
    font-weight: 700;
    cursor: pointer;
  }
  .normal:active {
    font-weight: 400;
  }
  .disabled {
    color: #c0c4cc;
    font-weight: 400;
  }
  .disabled:hover {
    cursor: not-allowed;
  }
</style>