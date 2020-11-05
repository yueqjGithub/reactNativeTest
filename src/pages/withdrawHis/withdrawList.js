import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableHighlight, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonTit from '../../components/commonTit';
import { globalStyle } from '../../globalStyle';
import http from '../../utils/myFetch';
import urls from '../../utils/urls';
import Toast, { DURATION } from 'react-native-easy-toast';

const getEnd = val => {
  const len = String(val).length
  return String(val).substr((len - 4), 4)
}

export default WithdrawList = ({ navigation }) => {
  const [cur, setCur] = useState(1)
  const [dataList, setList] = useState([])
  const toastRef = useRef(null)

  useEffect(() => {
    loadPage()
  }, [])

  const loadPage = () => {
    const obj = {
      thisPage: cur,
      thisCount: 20
    }
    http.post(urls.queryAgentEarn, obj).then(res => {
      console.log(res)
      if (res.list.length > 0) {
        let newPage = cur
        setCur(++newPage)
        let newList = [...dataList, ...res.list]
        setList(newList)
      }
    })
  }

  const openDetail = val => {
    navigation.navigate('WithdrawDetail', { isRecord: true, target: val })
  }

  const listItem = ({item}) => {
    return (
      <TouchableHighlight style={[globalStyle.fullWidth, globalStyle.flexJstard, globalStyle.flexAliCenter, globalStyle.paColMd]} underlayColor={'transparent'} onPress={() => openDetail(item)}>
        <View style={[globalStyle.fullWidth]}>
          <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliEnd]}>
            <Text style={{ fontSize: 16, fontFamily: 'DINEngschrift', color: '#333333' }}>提现_{item.bank_code}({getEnd(item.enc_bank_no)})</Text>
            <Text style={{ fontSize: 22, fontFamily: 'DINEngschrift', color: '#333333' }}>{item.amount}</Text>
          </View>
          <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliCenter]}>
            <Text style={{ fontSize: 14, color: '#AAABAB' }}>{item.create_time}</Text>
            <Text style={{ fontSize: 14, color: '#AAABAB' }}></Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  return (
    <SafeAreaView>
      <View style={[globalStyle.fillScreen, globalStyle.bgWhite]}>
        <CommonTit title={'提现记录'} navigation={navigation} showBackBtn={true}></CommonTit>
        {/* FlatList */}
        <View style={[globalStyle.fullWidth, globalStyle.flex1, globalStyle.paRowMd]}>
          <FlatList
            onEndReachedThreshold={0.2}
            onEndReached={() => {
              dataList.length >= 20 ? loadPage() : ''
            }}
            data={dataList}
            renderItem={listItem}
            ListEmptyComponent={
              <View style={[globalStyle.paMd, globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstCenter, globalStyle.flexAliCenter]}>
                <Text style={{ fontSize: 14, color: '#aaaaaa' }}>没有数据</Text>
              </View>
            }
            keyExtractor={item => String(item.id)}
            extraData={dataList}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}