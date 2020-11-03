import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { globalStyle } from '../../globalStyle';
import http from '../../utils/myFetch';
import urls from '../../utils/urls';
import Toast, { DURATION } from 'react-native-easy-toast';

const listItem = ({ item }) => {
  return (
    <View style={[globalStyle.fullWidth, globalStyle.flexJstard, globalStyle.flexAliCenter, globalStyle.paColMd]}>
      <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliEnd]}>
        <Text style={{ fontSize: 18, fontFamily: 'DINEngschrift', color: '#333333' }}>{item.user_name} | {item.course_name}</Text>
        <Text style={{ fontSize: 22, fontFamily: 'DINEngschrift', color: '#333333' }}>{item.amount}</Text>
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliCenter]}>
        <Text style={{ fontSize: 14, color: '#AAABAB' }}>{item.create_time}</Text>
        <Text style={{ fontSize: 14, color: '#AAABAB' }}></Text>
      </View>
    </View>
  )
}

export default CustomerPage = ({ navigation }) => {
  const [cur, setCur] = useState(1)
  const [dataList, setList] = useState([])
  const toastRef = useRef(null)

  useEffect(() => {
    loadPage()
  }, [])

  const loadPage = () => {
    const obj = {
      thisPage: cur,
      thisCount: 20,
      status: '1',
      constantCondition: '1'
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

  return (
    <View style={[globalStyle.fillScreen, globalStyle.bgWhite]}>
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
          keyExtractor={item => `${item}${Math.random() * 100}`}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
})