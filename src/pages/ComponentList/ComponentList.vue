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
          <p style="height: 30px; line-height: 30px;width:100px;text-align:left;font-size: 14px;">Normal</p>
          <button-component text="普通按钮" style="margin-left: 10px;"></button-component>
          <button-component text="圆角按钮" design="fillet" style="margin-left: 10px;"></button-component>
          <button-component text="半圆按钮" design="oval" style="margin-left: 10px;"></button-component>
          <button-component design="circle" icon="icon iconfont icon-sousuosearch82" style="margin-left: 10px;"></button-component>
        </div>
        <div style="display: flex; margin-top: 5px;">
          <p style="height: 30px; line-height: 30px;width:100px;text-align:left;font-size: 14px;">Primary</p>
          <button-component text="普通按钮"  type="primary" style="margin-left: 10px;"></button-component>
          <button-component text="圆角按钮"  type="primary" design="fillet" style="margin-left: 10px;"></button-component>
          <button-component text="半圆按钮"  type="primary" design="oval" style="margin-left: 10px;"></button-component>
          <button-component design="circle" type="primary" icon="icon iconfont icon-sousuosearch82" style="margin-left: 10px;"></button-component>
        </div>
        <div style="display: flex; margin-top: 5px;">
          <p style="height: 30px; line-height: 30px;width:100px;text-align:left;font-size: 14px;">Success</p>
          <button-component text="普通按钮"  type="success" style="margin-left: 10px;"></button-component>
          <button-component text="圆角按钮"  type="success" design="fillet" style="margin-left: 10px;"></button-component>
          <button-component text="半圆按钮"  type="success" design="oval" style="margin-left: 10px;"></button-component>
          <button-component design="circle" type="success" icon="icon iconfont icon-sousuosearch82" style="margin-left: 10px;"></button-component>
        </div>
        <div style="display: flex; margin-top: 5px;">
          <p style="height: 30px; line-height: 30px;width:100px;text-align:left;font-size: 14px;">Warning</p>
          <button-component text="普通按钮"  type="warning" style="margin-left: 10px;"></button-component>
          <button-component text="圆角按钮"  type="warning" design="fillet" style="margin-left: 10px;"></button-component>
          <button-component text="半圆按钮"  type="warning" design="oval" style="margin-left: 10px;"></button-component>
          <button-component design="circle" type="warning" icon="icon iconfont icon-sousuosearch82" style="margin-left: 10px;"></button-component>
        </div>
        <div style="display: flex; margin-top: 5px;">
          <p style="height: 30px; line-height: 30px;width:100px;text-align:left;font-size: 14px;">Error</p>
          <button-component text="普通按钮"  type="error" style="margin-left: 10px;"></button-component>
          <button-component text="圆角按钮"  type="error" design="fillet" style="margin-left: 10px;"></button-component>
          <button-component text="半圆按钮"  type="error" design="oval" style="margin-left: 10px;"></button-component>
          <button-component design="circle" type="error" icon="icon iconfont icon-sousuosearch82" style="margin-left: 10px;"></button-component>
        </div>
        <div style="display: flex; margin-top: 5px;">
          <p style="height: 30px; line-height: 30px;width:100px;text-align:left;font-size: 14px;">Special</p>
          <button-component icon ="icon iconfont icon-shangchuan" style="margin-left: 10px;"></button-component>
          <button-component :loading= "true" type="primary" design="fillet" style="margin-left: 10px;"></button-component>
        </div>
        <div style="display: flex; margin-top: 5px;">
          <text-button-component type="normal"   text="文字按钮"></text-button-component>
          <text-button-component type="disabled" text="文字按钮禁用" style="margin-left: 10px;"></text-button-component>
        </div>
        <div style="margin-top: 10px;">
          <input-component @input="inputChange" icon="right icon iconfont icon-sousuosearch82" placeholderInfo="带有图标的input框框" style="margin-top: 5px;"></input-component>
          <input-component placeholderInfo="带有清除的输入框" :clearable="true" style="margin-top: 5px;"></input-component>
          <input type="number">
        </div>
      </div>
     </div>
     <input-test-component v-model="testValue"></input-test-component>
  </div>
</template>

<script>
import inputTestComponent from '@/components/inputTestComponent'
import RadioComponent from '@/components/RadioComponent'
import MutiRadioComponent from '@/components/MutiRadioComponent'
import ButtonComponent from '@/components/ButtonComponent'
import TextButtonComponent from '@/components/TextButtonComponent'
import InputComponent from '@/components/InputComponent'
export default {
  name: 'ComponentList',  
  components: {
    inputTestComponent,
    InputComponent,
    RadioComponent,
    MutiRadioComponent,
    ButtonComponent,
    TextButtonComponent
  },
  data () {
    return {
      testValue: '09:00',
      data1: '111',
      data2: '222',
      data3: '444',
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
      ],
      ptions1: [
        {name: 'YES', checked: false},
        {name: 'NO', checked: true}
      ],
      ptions2: [
        {name: 'YES1', checked: false},
        {name: 'NO1', checked: true}
      ],
       ptions3: [
        {name: 'YES11', checked: false},
        {name: 'NO11', checked: true}
      ],
      ptions4: [
        {name: 'YES22', checked: false},
        {name: 'NO122', checked: true}
      ]
    }
  },
  methods: {
    radioChangeEvent (radioOptions) {
      console.log(radioOptions)
    },
    mutiRadioChangeEvent (mutiRadioOptions) {
      console.log(mutiRadioOptions)
    },
    inputChange (value) {
      console.log(value)
    }
  },
  watch: {
    testValue(to, from) {
      console.log(to,from)
    }
  }
}
</script>

<style>

</style>