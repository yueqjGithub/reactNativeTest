import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import CommonTit from '../../components/commonTit';
import { globalStyle } from '../../globalStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

export default MinePage = ({ navigation }) => {
  const route = useRoute();
  useEffect(() => {
    if (route.params?.changeName) {
      navigation.setParams({
        user_name: route.params.changeName,
        mobile: route.params.mobile,
        photo: route.params.photo,
        userid: route.params.userid
      })
    }
  }, [route.params?.changeName])
  const defaultAvatar = require('../../assets/images/defaultAvatar.png')

  const toEdit = () => {
    navigation.navigate('EditName', { user_name: route.params.user_name })
  }

  return (
    <SafeAreaView>
      <View style={[globalStyle.fillScreen, globalStyle.bgLightGrey]}>
        <CommonTit title={'个人信息'} navigation={navigation} showBackBtn={true}></CommonTit>
        <View style={[globalStyle.flex1, globalStyle.fullWidth, globalStyle.paMd]}>
          {/* first-content */}
          <View style={[globalStyle.fullWidth, globalStyle.bgWhite, globalStyle.paRowMd, globalStyle.paColSm, styles.contItem]}>
            {/* avatar */}
            <View style={[globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliCenter, globalStyle.paColMd]}>
              <Text style={[styles.label]}>头像</Text>
              <View style={{ width: 45, height: 45, borderRadius: 5 }}>
                <Image source={route.params.photo !== null ? { uri: route.params.photo } : defaultAvatar} style={[globalStyle.fullHeight, globalStyle.fullWidth]}></Image>
              </View>
            </View>
            {/* nickName */}
            <TouchableHighlight underlayColor={'transparent'} onPress={() => toEdit()} style={[globalStyle.fullWidth]}>
              <View style={[globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliCenter, globalStyle.paColMd]}>
                <Text style={[styles.label]}>昵称</Text>
                <Text style={{ fontSize: 14, color: '#999999' }}>{route.params.user_name ? route.params.user_name : '点击设置'} &gt;</Text>

              </View>
            </TouchableHighlight>
          </View>
          {/* mobile */}
          <View style={[globalStyle.fullWidth, globalStyle.bgWhite, globalStyle.paRowMd, globalStyle.paColSm, styles.contItem, globalStyle.maColMd]}>
            <View style={[globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliCenter, globalStyle.paColSm]}>
              <Text style={[styles.label]}>绑定手机号</Text>
              <TouchableHighlight>
                <Text style={{ fontSize: 14, color: '#999999' }}>{route.params.mobile || ''}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contItem: {
    borderRadius: 6
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333'
  }
})