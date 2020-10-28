import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyle } from '../../globalStyle'
import HeadBar from './pageHeader'

const LoginPage = ({ navigation }) => {
  const [mobile, setMobile] = useState()
  const [code, setCode] = useState()
  const [mobileReg, setMobileReg] = useState(true)
  const [codeIsNull, setCodeIsNull] = useState(false)
  const [codeLimit, setCodeLimit] = useState('获取')
  const [myInterval, setMyInterval] = useState()
  const mobileRegExp = /^[1][3,4,5,7,8][0-9]{9}$/
  const toIndex = () => {
    navigation.navigate('Index')
  }

  const checkMobile = val => {
    if (!mobileRegExp.test(val)) {
      setMobileReg(false)
    } else {
      setMobileReg(true)
      setMobile(val)
    }
  }

  const checkCodeIsNull = () => {
    if (!code) {
      setCodeIsNull(true)
    }
  }
  const checkCode = val => {
    if (val) {
      setCode(val)
      setCodeIsNull(false)
    } else {
      setCodeIsNull(true)
    }
  }

  return (
    <SafeAreaView>
      <View style={[globalStyle.paRowMd, globalStyle.bgWhite, globalStyle.fillScreen]}>
        <HeadBar></HeadBar>
        <Text style={[style.label, globalStyle.paColSm]}>手机号码</Text>
        <View>
          <TextInput onChangeText={param => checkMobile(param)}
          placeholder="请输入手机号"
          ></TextInput>
          <Text style={style.hint}>{mobileReg ? '' : '手机号格式错误'}</Text>
        </View>
        {/* 验证码 */}
        <Text style={[style.label, globalStyle.paColSm]}>验证码</Text>
        <View>
          <View style={[globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliCenter]}>
            <View style={globalStyle.flex3}>
              <TextInput
              onChangeText={val => checkCode(val)}
              onBlur={() => checkCodeIsNull()}
              placeholder="请输入验证码"
              ></TextInput>
            </View>
            <View style={globalStyle.flex1}>
              <Button title={codeLimit} color="#393939" style={style.codeBtn}></Button>
            </View>
          </View>
          <Text style={style.hint}>{!codeIsNull ? '' : '请输入验证码'}</Text>
        </View>
        <Button title="登录" color="#393939" style={style.buttonNoram} onPress={() => toIndex()}></Button>
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  buttonNoram: {
    color: '#393939'
  },
  label: {
    fontSize: 20,
    color: '#333333',
    fontWeight: 'bold'
  },
  hint: {
    fontSize: 14,
    color: 'red'
  },
  codeBtn: {
    width: 100
  }
})
export default LoginPage