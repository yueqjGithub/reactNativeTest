import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonTit from '../../components/commonTit';
import { globalStyle } from '../../globalStyle';
import http from '../../utils/myFetch';
import urls from '../../utils/urls';
import Toast, { DURATION } from 'react-native-easy-toast';

const listItem = ({item}) => {
  return (
    <View style={[globalStyle.fullWidth, globalStyle.flexJstard, globalStyle.flexAliCenter, globalStyle.paColMd]}>
      <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliEnd]}>
        <Text style={{fontSize: 18, fontFamily: 'DINEngschrift', color: '#333333'}}>{item.user_name}</Text>
        <Text style={{fontSize: 22, fontFamily: 'DINEngschrift', color: '#333333'}}>{item.amount}</Text>
      </View>
      <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliCenter]}>
        <Text style={{fontSize: 14, color: '#AAABAB'}}>绑定时间 {item.create_time}</Text>
        <Text style={{fontSize: 14, color: '#AAABAB'}}>总提成</Text>
      </View>
    </View>
  )
}

export default CustomerPage = ({ navigation }) => {
  const [memberCount, setMemberCount] = useState(0)
  const [memIncome, setIncome] = useState(0)
  const [cur, setCur] = useState(1)
  const [dataList, setList] = useState([])
  const toastRef = useRef(null)

  useEffect(() => {
    http.post(urls.queryMemberTotal, {type: 2}).then(res => {
      if (res.costomer_count) {
        setMemberCount(res.costomer_count)
      }
      if (res.commission) {
        setIncome(res.commission)
      }
    }).catch(() => {
      toastRef.current.show('获取数据失败', 2000)
    })
  }, [memberCount, memIncome])

  useEffect(() => {
    loadPage()
  }, [])

  const loadPage = () => {
    const obj = {
      thisPage: cur,
      thisCount: 20,
      type: 2
    }
    console.log(obj)
    http.post(urls.queryMemberList, obj).then(res => {
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
        <CommonTit title={'我的客户'} navigation={navigation} showBackBtn={true}></CommonTit>
        {/* top */}
        <View style={[globalStyle.flexRow, globalStyle.paRowMd, globalStyle.paColLg, globalStyle.flexJstCenter, globalStyle.flexAliCenter]}>
          <ImageBackground source={require('../../assets/images/normalCard.png')} style={{ width: '100%', borderRadius: 5, overflow: 'hidden', ...globalStyle.flexRow, ...globalStyle.flexJstCenter, ...globalStyle.flexAliCenter }} resizeMethod="scale">
            <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstCenter, globalStyle.flexAliCenter, globalStyle.paLg]}>
              <View style={[globalStyle.flexJstBtw, globalStyle.flexAliStart]}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', ...styles.goldText }}>{memberCount}</Text>
                <Text style={{ fontSize: 14, ...styles.goldText }}>我的客户</Text>
              </View>
              <View style={styles.splite}></View>
              <View style={[globalStyle.flexJstBtw, globalStyle.flexAliStart]}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', ...styles.goldText }}>{memIncome}</Text>
                <Text style={{ fontSize: 14, ...styles.goldText }}>客户提成（元）</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
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
      <Toast ref={toastRef} position={'center'} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  goldText: {
    color: '#D5C6B1'
  },
  splite: {
    width: 1,
    height: 28,
    backgroundColor: '#d5c6b1',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 20
  }
})