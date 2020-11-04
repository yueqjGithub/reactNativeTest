import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, TextInput, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import CommonTit from '../../components/commonTit';
import { globalStyle } from '../../globalStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import Toast, { DURATION } from 'react-native-easy-toast';
import http from '../../utils/myFetch';
import urls from '../../utils/urls';
import Picker from 'react-native-picker';

export default AddCard = ({ navigation }) => {
  const route = useRoute()
  const toastRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [owner, setOwner] = useState(null) // 持卡人
  const [ownerVali, setOwnerVali] = useState(false) // 持卡人验证标识 
  const [cardNum, setCardNum] = useState(null)
  const [cardNumVali, setCardNumVali] = useState(false)
  const [bankName, setBank] = useState(null) // 开户行
  const [openBank, setOpen] = useState(null) // 开户行支行
  const [openVali, setOpenVali] = useState(false)
  // 校验持卡人
  const validOwner = (val) => {
    if (val) {
      setOwner(val)
      setOwnerVali(true)
    } else {
      setOwner(null)
      setOwnerVali(false)
    }
  }
  // 校验银行卡号
  const validCardNum = (val) => {
    const reg = /[1-9]\d{12,18}/
    if (reg.test(val)) {
      setCardNum(val)
      setCardNumVali(true)
    } else {
      setCardNum(null)
      setCardNumVali(false)
    }
  }
  // 校验支行名称
  const valiOpen = (val) => {
    if (val) {
      setOpen(val)
      setOpenVali(true)
    } else {
      setOpen(null)
      setOpenVali(false)
    }
  }
  // 选择开户行
  const chooseBank = () => {
    const bankList = [
      '中国农业银行', '中国工商银行', '中国建设银行', '中国银行', '邮政储蓄银行', '浦发银行',
      '交通银行', '招商银行', '中国光大银行', '平安银行', '中信银行', '中国民生银行'
    ]
    Picker.init({
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '',
      pickerData: bankList,
      pickerToolBarBg: [255, 255, 255, 1],
      pickerBg: [255, 255, 255, 1],
      selectedValue: [1],
      onPickerConfirm: data => {
        setBank(data)
      },
      onPickerCancel: data => {
      }
    });
    Picker.show();
  }
  // 提交
  const commitBankInfo = () => {
    const obj = {
      bank_name: bankName[0], //银行名称 "card_num": 1, //卡号 "account_name": 1, //账户名称 "open_account_bank": 1, //开户行 }
      card_num: cardNum,
      account_name: owner,
      open_account_bank: openBank
    }
    setLoading(true)
    http.post(urls.addCard, obj).then(res => {
      setLoading(false)
      if (res.code === 'success') {
        navigation.navigate('CardList') // 到下一步
      } else {
        toastRef.current.show(res.msg, 2000)
      }
    }).catch(err => {
      setLoading(false)
      toastRef.current.show('添加出错', 2000)
    })
  }
  return (
    <SafeAreaView>
      <View style={[globalStyle.fillScreen, globalStyle.bgWhite]}>
        <CommonTit title={'添加银行卡'} navigation={navigation} showBackBtn={true}></CommonTit>
        <ScrollView style={[globalStyle.paMd, globalStyle.flex1]}>
          <View style={[globalStyle.flex1]}>
            {/* 持卡人 */}
            <View style={[globalStyle.paColSm]}>
              <Text style={styles.label}>持卡人</Text>
              <TextInput
                style={{ fontSize: 15, fontFamily: 'DINEngschrift' }}
                onChangeText={(param) => validOwner(param)}
                placeholder="输入持卡人姓名"
              />
            </View>
            {/* 卡号 */}
            <View style={[globalStyle.paColSm]}>
              <Text style={styles.label}>卡号</Text>
              <TextInput
                style={{ fontSize: 15, fontFamily: 'DINEngschrift' }}
                onChangeText={(param) => validCardNum(param)}
                placeholder="输入银行卡号"
              />
            </View>
            {/* 开户行 */}
            <View style={[globalStyle.paColSm]}>
              <Text style={styles.label}>开户行</Text>
              <TouchableHighlight underlayColor={'transparent'} style={[globalStyle.fullWidth]} onPress={() => { chooseBank() }}>
                <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliCenter, globalStyle.paColSm]}>
                  {
                    bankName ? <Text style={{ fontSize: 15, color: '#333333' }}>{bankName}</Text> :
                      <Text style={{ fontSize: 15, color: '#cccccc' }}>请选择开户行</Text>
                  }
                  <Image source={require('../../assets/images/select.png')} style={{ width: 15, height: 15 }}></Image>
                </View>
              </TouchableHighlight>
            </View>
            {/* 开户支行 */}
            <View style={[globalStyle.paColSm]}>
              <Text style={styles.label}>开户行支行</Text>
              <TextInput
                style={{ fontSize: 15, fontFamily: 'DINEngschrift' }}
                onChangeText={(param) => valiOpen(param)}
                placeholder="输入开户支行名称"
              />
            </View>
          </View>
          {/* 下一步按钮 */}
          <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstCenter, globalStyle.flexAliCenter, globalStyle.paLg]}>
            <View style={[globalStyle.fullWidth]}>
              <Button title="下一步"
                onPress={() => commitBankInfo()} disabled={!ownerVali || !cardNumVali || !bankName || !openVali}
                buttonStyle={{ backgroundColor: '#EF4A44', color: '#ffffff' }}
                loading={loading}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <Toast ref={toastRef} position={'center'} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333'
  }
})