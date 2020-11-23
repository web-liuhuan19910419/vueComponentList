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
        <div>
          <button-component></button-component>
        </div>
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