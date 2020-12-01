<template>
  <div class="create-invite-layout">
    <p class="title-layout">
      {{$t(title)}}
    </p>
    <action-button-component
      buttonTitle='message.supplierAndPurchase.newInviteCode'
      @on-button-action="createInviteCode"
      :isWhiteBGProp=true>
    </action-button-component>
    <p class="Invite-code-layout">
      {{getValue}}
    </p>
    <el-button type="text" v-copy="getValue" class="copy-layout" v-if="getValue.length !== 0">{{$t('message.managementAndReport.copy')}}</el-button>
  </div>
</template>
<script>
  import ActionButtonComponent from '@/components/ActionButtonComponent'
  export default {
    name: 'CreateInviteCodeComponent',
    components: {ActionButtonComponent},
    props: {
      title: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
      }
    },
    methods: {
      createInviteCode () {
        this.$emit('on-create-invite-code')
      },
      // 表单禁用事件
      onDisabled (disabled) {
        this.disabled = disabled
      },
      // 表单重置事件
      onResetField () {
        // this.value = (this.value !== null && this.value !== undefined) ? this.value : ''
      },
      // 通过setValue,changeField,changeValue方法设置表单值时事件
      onSetValue (val, $f) {
        // this.value = val
      }
    },
    computed: {
      getValue () {
        return this.value
      }
    }
  }
</script>
<style scoped>
  .create-invite-layout {
    display: flex;
  }
  .title-layout {
    width: 160px;
    text-align: left;
  }
  .Invite-code-layout {
    width: 100px;
    margin-left: 15px;
  }
  .copy-layout {
    margin-left: 15px;
  }
</style>
