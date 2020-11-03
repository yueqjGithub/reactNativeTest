import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import CommonTit from '../../components/commonTit';
import { globalStyle } from '../../globalStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import http from '../../utils/myFetch';
import urls from '../../utils/urls';
import Toast, { DURATION } from 'react-native-easy-toast';
import CusTab from '../../components/commonTabBar';
import Storage from '../../utils/storage'
// import Picker from 'react-native-picker';

const MinePage = ({ navigation, route }) => {
  const toastRef = useRef(null)
  const [info, setInfo] = useState({
    photo: null,
    user_name: null
  })

  useEffect(() => {
    queryMine()
  }, [])

  const queryMine = () => {
    http.post(urls.queryMine).then(res => {
      console.log(res)
      setInfo(res.user)
    })
  }

  const defaultAvatar = require('../../assets/images/defaultAvatar.png')

  const logOut = () => {
    Alert.alert('确定要退出登录吗', '',
      [
        {
          text: "取消", onPress: () => {
            // Picker.init({
            //   pickerConfirmBtnText: '确定',
            //   pickerCancelBtnText: '取消',
            //   pickerTitleText: '',
            //   pickerData: [1,2,3,4,5,6,7,8],
            //   pickerToolBarBg: [255,255,255,1],
            //   pickerBg: [255,255,255,1],
            //   selectedValue: [1],
            //   onPickerConfirm: data => {
            //     console.log(data);
            //   },
            //   onPickerCancel: data => {
            //     console.log(data);
            //   },
            //   onPickerSelect: data => {
            //     console.log(data);
            //   }
            // });
            // Picker.show();
          }
        },
        {
          text: "确认", onPress: () => {
            Storage.remove({
              key: 'userInfo'
            }); // 清除token
            navigation.navigate('Login');
          }
        }
      ]
    );
  }

  return (
    <SafeAreaView>
      <View style={[globalStyle.fillScreen, globalStyle.bgWhite]}>
        <CommonTit title={'我的'} navigation={navigation} showBackBtn={false}></CommonTit>
        {/* top */}
        <View style={[globalStyle.paMd, globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliCenter]}>
          <View style={{ width: 60, height: 60, borderRadius: 5 }}>
            <Image source={info.photo !== null ? { uri: info.photo } : defaultAvatar} style={[globalStyle.fullHeight, globalStyle.fullWidth]}></Image>
          </View>
          {/* topRight */}
          <View style={[globalStyle.flex1, globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliStart, globalStyle.paRowSm]}>
            <View style={{ height: 55, ...globalStyle.flexJstArd, ...globalStyle.flexAliStart }}>
              <Text style={{ fontSize: 17, color: '#333333', fontWeight: '700' }}>{info.user_name !== null ? info.user_name : '用户名'}</Text>
              <Image source={require('../../assets/images/deg.png')} style={{ width: 84, height: 22 }}></Image>
            </View>
          </View>
        </View>
        {/* menuList */}
        <View style={[globalStyle.paMd]}>
          <TouchableHighlight style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstStart, globalStyle.flexAliCenter, globalStyle.paColMd, style.listBorder]}
            underlayColor={'transparent'}
          >
            <Text style={{ fontSize: 18, color: '#333333', fontWeight: '800' }}>银行卡</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstStart, globalStyle.flexAliCenter, globalStyle.paColMd]}
            underlayColor={'transparent'}
            onPress={() => logOut()}
          >
            <Text style={{ fontSize: 18, color: '#CCCCCC', fontWeight: '800' }}>退出登录</Text>
          </TouchableHighlight>
        </View>
        <View style={[style.cusTabStyle, globalStyle.paRowLg, globalStyle.paColMd, globalStyle.flexRow, globalStyle.flexJstCenter, globalStyle.flexAliCenter]}>
          <CusTab navigation={navigation} route={route} />
        </View>
      </View>
      <Toast ref={toastRef} position={'center'} />
    </SafeAreaView>
  )
}

export default MinePage

const style = StyleSheet.create({
  cusTabStyle: {
    position: "absolute",
    bottom: 0,
    width: '100%',
    // backgroundColor: 'yellow'
    borderTopColor: '#F7F7F7',
    borderTopWidth: 1,
    borderStyle: 'solid'
  },
  listBorder: {
    borderBottomColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  }
})