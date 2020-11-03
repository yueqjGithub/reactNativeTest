import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableHighlight, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonTit from '../../components/commonTit';
import { globalStyle } from '../../globalStyle';
import http from '../../utils/myFetch';
import urls from '../../utils/urls';
import Toast, { DURATION } from 'react-native-easy-toast';

const listItem = ({item}) => {
  return (
    <TouchableHighlight style={[globalStyle.fullWidth, globalStyle.flexJstard, globalStyle.flexAliCenter, globalStyle.paColMd]} underlayColor={'transparent'}>
      <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliEnd]}>
        <Text style={{fontSize: 16, fontFamily: 'DINEngschrift', color: '#333333'}}>提现_{item.bank_name}({item.card_num})</Text>
        <Text style={{fontSize: 22, fontFamily: 'DINEngschrift', color: '#333333'}}>{item.mount}</Text>
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliCenter]}>
        <Text style={{fontSize: 14, color: '#AAABAB'}}>{item.create_time}</Text>
        <Text style={{fontSize: 14, color: '#AAABAB'}}></Text>
      </View>
    </TouchableHighlight>
  )
}

export default WithdrawList = ({navigation}) => {
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
    console.log(obj)
    http.post(urls.queryAgentEarn, obj).then(res => {
      if (res.list.length > 0) {
        let newPage = cur
        setCur(++newPage)
        let newList = [...dataList, ...res.list]
        setList(newList)
      }
    })
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
                <Text style={{fontSize: 14, color: '#aaaaaa'}}>没有数据</Text>
              </View>
            }
            keyExtractor={item => `${item}${Math.random()*100}`}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}