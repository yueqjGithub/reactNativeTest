import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import CommonTit from '../../components/commonTit';
import { globalStyle } from '../../globalStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import Toast, { DURATION } from 'react-native-easy-toast';
import http from '../../utils/myFetch';
import urls from '../../utils/urls';

export default EditName = ({ navigation }) => {
  const route = useRoute()
  const [changeResult, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const toastRef = useRef(null)

  const back = () => {
    navigation.navigate('MineDetail', {
      ...route.params,
      changeName: changeResult
    })
  }

  const changeNickName = () => {
    const obj = {
      user_name: changeResult
    }
    setLoading(true)
    http.post(urls.updateUser, obj).then(res => {
      setLoading(false)
      toastRef.current.show(res.msg, 2000)
      if (res.code === 'success') {
        back()
      }
    }).catch(err => {
      setLoading(false)
      toastRef.current.show('修改出错', 2000)
    })
  }

  return (
    <SafeAreaView>
      <View style={[globalStyle.fillScreen, globalStyle.bgLightGrey]}>
        <CommonTit title={'个人信息'} navigation={navigation} showBackBtn={true}></CommonTit>
        <View style={[globalStyle.flex1, globalStyle.fullWidth, globalStyle.paRowLg, globalStyle.paColMd]}>
          <View style={[globalStyle.fullWidth, globalStyle.bgWhite, styles.inputContainer]}>
            <TextInput
              style={{ fontSize: 16, fontFamily: 'DINEngschrift' }}
              onChangeText={(param) => setResult(param)}
              placeholder="输入昵称"
            />
          </View>
          <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstCenter, globalStyle.flexAliCenter, globalStyle.paRowLg]}>
            <View style={[globalStyle.fullWidth]}>
              <Button title="提交" onPress={() => changeNickName()} disabled={changeResult==='' || !changeResult} buttonStyle={{ backgroundColor: '#EF4A44', color: '#ffffff' }}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </View>
      <Toast ref={toastRef} position={'center'}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 6,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    marginBottom: 90
  }
})