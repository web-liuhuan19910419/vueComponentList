<template>
  <div class='page-content-layout'>
     <h2 class="page-title-layout">{{$t('message.pageTitle.baseComponent')}}</h2>
     <div style="display: flex;">
      <div>
        <radio-component
          title="地址水平排列"
          :isVertical="true"
          marginTopSet="10px"
          :isMustProp="true"
          :radioOptions="radioOptions"
          @radio-chage-event="radioChangeEvent">
        </radio-component>
        <radio-component
          title="地址竖直排列的"
          marginLeftSet="10px"
          :isVertical="false"
          :isMustProp="true"
          :radioOptions="radioOptions"
          @radio-chage-event="radioChangeEvent">
        </radio-component>
        <muti-radio-component
          marginTopSet="10px"
          title="多选水平排列"
          :isVertical="true"
          :isMustProp="true"
          :radioOptions="mutiRadioOptions"
          @radio-chage-event="mutiRadioChangeEvent">
        </muti-radio-component>
        <muti-radio-component
          marginLeftSet="10px"
          title="多选垂直排列"
          :isVertical="false"
          :isMustProp="true"
          :radioOptions="mutiRadioOptions"
          @radio-chage-event="mutiRadioChangeEvent">
        </muti-radio-component>
        <div style="display: flex; margin-top: 10px;">
          <p style="height: 30px; line-height: 30px;">Normal</p>
          <button-component text="普通按钮" style="margin-left: 10px;"></button-component>
          <button-component text="圆角按钮" design="fillet" style="margin-left: 10px;"></button-component>
          <button-component text="半圆按钮" design="oval" style="margin-left: 10px;"></button-component>
          <button-component design="circle" icon="icon iconfont icon-sousuosearch82" style="margin-left: 10px;"></button-component>
        </div>
        <div style="display: flex; margin-top: 5px;">
          <p style="height: 30px; line-height: 30px;">Primary</p>
          <button-component text="普通按钮"  type="primary" style="margin-left: 10px;"></button-component>
          <button-component text="圆角按钮"  type="primary" design="fillet" style="margin-left: 10px;"></button-component>
          <button-component text="半圆按钮"  type="primary" design="oval" style="margin-left: 10px;"></button-component>
          <button-component design="circle" type="primary" icon="icon iconfont icon-sousuosearch82" style="margin-left: 10px;"></button-component>
        </div>
        <div style="display: flex; margin-top: 5px;">
          <p style="height: 30px; line-height: 30px;">Success</p>
          <button-component text="普通按钮"  type="success" style="margin-left: 10px;"></button-component>
          <button-component text="圆角按钮"  type="success" design="fillet" style="margin-left: 10px;"></button-component>
          <button-component text="半圆按钮"  type="success" design="oval" style="margin-left: 10px;"></button-component>
          <button-component design="circle" type="success" icon="icon iconfont icon-sousuosearch82" style="margin-left: 10px;"></button-component>
        </div>
        <div style="display: flex; margin-top: 5px;">
          <p style="height: 30px; line-height: 30px;">Warning</p>
          <button-component text="普通按钮"  type="warning" style="margin-left: 10px;"></button-component>
          <button-component text="圆角按钮"  type="warning" design="fillet" style="margin-left: 10px;"></button-component>
          <button-component text="半圆按钮"  type="warning" design="oval" style="margin-left: 10px;"></button-component>
          <button-component design="circle" type="warning" icon="icon iconfont icon-sousuosearch82" style="margin-left: 10px;"></button-component>
        </div>
        <div style="display: flex; margin-top: 5px;">
          <p style="height: 30px; line-height: 30px;">Error</p>
          <button-component text="普通按钮"  type="error" style="margin-left: 10px;"></button-component>
          <button-component text="圆角按钮"  type="error" design="fillet" style="margin-left: 10px;"></button-component>
          <button-component text="半圆按钮"  type="error" design="oval" style="margin-left: 10px;"></button-component>
          <button-component design="circle" type="error" icon="icon iconfont icon-sousuosearch82" style="margin-left: 10px;"></button-component>
        </div>
         <div style="display: flex; margin-top: 5px;">
          <p style="height: 30px; line-height: 30px;">Special</p>
          <button-component icon ="icon-tubiao-" style="margin-left: 10px;"></button-component>
          <button-component text="loading按钮"  type="primary" design="fillet" style="margin-left: 10px;"></button-component>
        </div>
        <i class="icon iconfont icon-sousuosearch82"></i>
      </div>
     </div>
  </div>
</template>

<script>
import RadioComponent from '@/components/RadioComponent'
import MutiRadioComponent from '@/components/MutiRadioComponent'
import ButtonComponent from '@/components/ButtonComponent'
export default {
  name: 'ComponentList',  
  components: {
    RadioComponent,
    MutiRadioComponent,
    ButtonComponent
  },
  data () {
    return {
      radioOptions: [
        {name: '江西', value: '1'},
        {name: '湖南', value: '0'},
        {name: '杭州', value: '2'}
      ],
      mutiRadioOptions: [
        {name: '江西', value: '1'},
        {name: '湖南', value: '0'},
        {name: '江苏', value: '0'},
        {name: '上海', value: '1'},
        {name: '杭州', value: '2'}
      ]
    }
  },
  methods: {
    radioChangeEvent (radioOptions) {
      console.log(radioOptions)
    },
    mutiRadioChangeEvent (mutiRadioOptions) {
      console.log(mutiRadioOptions)
    }
  }
}
</script>

<style>

</style>