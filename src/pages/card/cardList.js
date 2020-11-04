import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, ScrollView, Image } from 'react-native';
import CommonTit from '../../components/commonTit';
import { globalStyle } from '../../globalStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import Toast, { DURATION } from 'react-native-easy-toast';
import http from '../../utils/myFetch';
import urls from '../../utils/urls';

export default CardList = ({ navigation }) => {
  const route = useRoute()
  const toastRef = useRef(null)
  const [dataList, setList] = useState([])

  useEffect(() => {
    queryList()
  }, [])

  const queryList = () => {
    http.post(urls.queryCardList).then(res => {
      console.log(res)
      if (res.list?.length > 0) {
        setList(res.list)
      }
    })
  }

  return (
    <SafeAreaView>
      <View style={[globalStyle.fillScreen, globalStyle.bgWhite]}>
        <CommonTit title={'我的银行卡'} navigation={navigation} showBackBtn={true}></CommonTit>
        <ScrollView style={[globalStyle.flex1]}>
          <View style={[globalStyle.paRowMd, globalStyle.paColLg]}>
            <Text style={{ fontSize: 18, color: '#333333', fontWeight: '700' }}>我的银行卡</Text>
          </View>
          <View style={[globalStyle.paMd]}>
            {/* 银行卡列表预留 */}
            <TouchableHighlight
            underlayColor={'transparent'}
            style={[styles.listItem, globalStyle.maColSm]}
            onPress={() => navigation.navigate('AddCard')}
            >
              <View style={[globalStyle.fullWidth, globalStyle.fullHeight, globalStyle.paMd, globalStyle.flexRow, globalStyle.flexJstStart, globalStyle.flexAliCenter]}>
                <Image source={require('../../assets/images/add.png')} style={{width: 18, height: 18, marginRight: 5}}></Image>
                <Text style={{fontSize: 16, fontWeight: '700', color: '#333333'}}>添加银行卡</Text>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
      <Toast ref={toastRef} position={'center'} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    borderRadius: 6,
    height: 120,
    backgroundColor: '#f8f8f8'
  }
})