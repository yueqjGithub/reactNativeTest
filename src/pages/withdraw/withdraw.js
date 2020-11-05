import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableHighlight, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { globalStyle } from '../../globalStyle';
import CommonTit from '../../components/commonTit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import Toast, { DURATION } from 'react-native-easy-toast';
import http from '../../utils/myFetch';
import urls from '../../utils/urls';
import ActionSheet from 'react-native-actionsheet';

export default Withdraw = ({ navigation }) => {
  const route = useRoute()
  const toastRef = useRef(null)
  const sheetRef = useRef(null)
  const [cardList, setCardList] = useState([])
  const [chooseCard, setChoose] = useState(null)
  const [sheetOptions, setOptions] = useState([])
  const [amount, setAmount] = useState(null)
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    queryCardList()
    queryBalance()
  }, [])

  const queryBalance = () => {
    http.post(urls.queryBalance, {type: 2}).then(res => {
      console.log(res)
      if (res.code === 'success') {
        setBalance(res.data.balance)
      } else {
        toastRef.current.show(res.msg, 2000)
      }
    })
  }

  const queryCardList = () => { // 请求银行卡
    http.post(urls.queryCardList).then(res => {
      if (res.list?.length > 0) {
        setCardList(res.list)
        const sheets = res.list.map(item => {
          return (
            <View style={[globalStyle.fullWidth, globalStyle.flexJstCenter, globalStyle.flexAliStart, globalStyle.paSm]}>
              <Text style={{ fontSize: 15, fontWeight: '400', color: '#4C4C4C' }}>{item.bank_name}({getEnd(item.card_num)})</Text>
              <Text style={{ fontSize: 13, color: '#cccccc' }}>1~7个工作日内到账</Text>
            </View>
          )
        })
        sheets.push('取消')
        setOptions(sheets)
        const card = res.list[0]
        setChoose(card)
      }
    })
  }

  const getEnd = (val) => { // 获取尾号
    const len = String(val).length
    return String(val).substr((len - 4), 4)
  }

  const topClickHandler = () => {
    if (chooseCard) {
      sheetRef.current.show()
    } else {
      navigation.navigate('AddCard')
    }
  }

  const changeCard = idx => {
    const target = cardList[idx]
    setChoose(target)
  }

  const setAll = () => { // 全部提现
    const num = String(balance)
    setAmount(num)
  }

  const inputAmount = val => { // 输入提现金额
    if (Number(val) <= Number(balance)) {
      setAmount(val)
    } else {
      setAll()
    }
  }

  const commitWithdraw = () => {
    const obj = {
      enc_bank_no: chooseCard.card_num,
      enc_true_name: chooseCard.account_name,
      bank_code: chooseCard.bank_name,
      fee: amount
    }
    setLoading(true)
    http.post(urls.withdrawToBank, obj).then(res => {
      setLoading(false)
      if (res.code === 'success') {
        navigation.navigate('WithdrawDetail', {
          isRecord: false,
          target: {
            bank_code: chooseCard.bank_name,
            enc_bank_no: chooseCard.card_num,
            amount: amount,
            status: 0
          }
        })
      } else {
        toastRef.current.show(res.msg, 2000)
      }
    }).catch(err => {
      setLoading(false)
      toastRef.current.show('提现出错', 2000)
    })
  }

  return (
    <SafeAreaView>
      <View style={[globalStyle.fillScreen, globalStyle.bgWhite]}>
        <CommonTit title={'提现'} navigation={navigation} showBackBtn={true}></CommonTit>
        <ScrollView style={[globalStyle.paMd, globalStyle.flex1]}>
          <View style={styles.container}>
            {/* 卡选择 */}
            <TouchableHighlight underlayColor={'transparent'} style={[globalStyle.fullWidth]} onPress={() => topClickHandler()}>
              {
                chooseCard > 0 ?
                  ( 
                    <View style={[styles.addContainer, globalStyle.flexRow, globalStyle.flexJstStart, globalStyle.flexAliCenter, globalStyle.paMd]}>
                      <Image source={require('../../assets/images/add.png')} style={{ width: 16, height: 16, marginRight: 5 }}></Image>
                      <Text style={{ fontSize: 14, fontWeight: '700', color: '#4C4C4C' }}>添加银行卡</Text>
                    </View>
                  ) : (
                    <View style={[styles.addContainer, globalStyle.flexJstArd, globalStyle.flexAliStart, globalStyle.paMd]}>
                      <Text style={{ fontSize: 14, fontWeight: '700', color: '#4C4C4C' }}>{chooseCard?.bank_name}</Text>
                      <Text style={{ fontSize: 13, color: '#5F5F5F' }}>尾号 {getEnd(chooseCard?.card_num)}</Text>
                    </View>
                  )
              }
            </TouchableHighlight>
            {/* 提现金额 */}
            <View style={[globalStyle.paMd]}>
              <Text style={{ fontSize: 16, color: '#6A6A6A', fontWeight: '700' }}>提现金额</Text>
            </View>
            {/* 金额输入 */}
            <View style={[globalStyle.paRowMd, globalStyle.paColSm, globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliBase]}>
              <View style={[globalStyle.selfStretch, globalStyle.flexJstCenter]}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#5F5F5F', marginTop: 11 }}>￥</Text>
              </View>
              <TextInput style={{ fontSize: 32, fontWeight: '700', color: '#5f5f5f', fontFamily: 'DINEngschrift', ...globalStyle.flex1 }}
                clearButtonMode={'while-editing'}
                placeholder={'请输入提现金额'}
                placeholderTextColor={'#cccccc'}
                onChangeText={val => inputAmount(val)}
                value={amount}
              ></TextInput>
            </View>
            {/* 分割线 */}
            <View style={{ width: '100%', height: 1, backgroundColor: '#e7e7e7', marginBottom: 15 }}></View>
            <View style={[globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliCenter, globalStyle.paRowMd]}>
              <Text style={{ fontSize: 14, color: '#8c8c8c' }}>可提现余额：{balance}</Text>
              <TouchableHighlight underlayColor={'transparent'} onPress={() => { setAll() }}>
                <Text style={{ color: '#5870A1', fontSize: 14 }}>全部提现</Text>
              </TouchableHighlight>
            </View>
            {/* 按钮 */}
            <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstCenter, globalStyle.flexAliCenter, globalStyle.paLg]}>
              <View style={[globalStyle.fullWidth]}>
                <Button title="确认提现"
                  onPress={() => {commitWithdraw()}} disabled={!amount || !chooseCard || Number(amount) === 0}
                  buttonStyle={{ backgroundColor: '#EF4A44', color: '#ffffff' }}
                  loading={loading}
                />
                <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstArd,globalStyle.flexAliCenter, globalStyle.paColSm]}>
                  <Text style={{fontSize: 14, color: '#A1A1A1'}}>提现服务费（10%）</Text>
                  <Text style={{fontSize: 14, color: '#A1A1A1'}}>1~7个工作日内到账</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <Toast ref={toastRef} position={'center'} />
      <ActionSheet
        ref={sheetRef}
        title={'选择银行卡'}
        options={sheetOptions}
        cancelButtonIndex={sheetOptions.length - 1}
        onPress={(index) => { changeCard(index) }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 6,
    backgroundColor: '#F8F8F8'
  },
  addContainer: {
    backgroundColor: '#f0f0f0'
  }
})