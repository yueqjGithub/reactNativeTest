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

export default WithdrawDetail = ({ navigation }) => {
  const route = useRoute()
  const [title, setTit] = useState('提现记录')
  const [showBack, setShowBack] = useState(true)
  useEffect(() => {
    console.log(route)
    if (!route.params?.isRecord) {
      setTit('提现')
      setShowBack(false)
    } else {
      setTit('提现记录')
      setShowBack(true)
    }
  }, [route.params])

  const getEnd = val => {
    const len = String(val.length)
    return String(val).substr(len - 4, 4)
  }

  return (
    <SafeAreaView>
      <View style={[globalStyle.fillScreen, globalStyle.bgWhite]}>
        <CommonTit title={title} navigation={navigation} showBackBtn={showBack}></CommonTit>
        <ScrollView style={[globalStyle.paMd, globalStyle.flex1]}>
          <View style={[globalStyle.paColMd]}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#5F5F5F' }}>提现-{route.params.target?.bank_code}（{getEnd(route.params.target?.enc_bank_no)}）</Text>
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#5F5F5F', fontFamily: 'DINEngschrift' }}>{route.params.target?.amount}</Text>
          </View>
          {/* step */}
          <View style={[globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliStart, globalStyle.paColLg]}>
            <View style={[globalStyle.selfStretch, globalStyle.flexJstStart, globalStyle.flexAliStart, styles.labelContainer]}>
              <Text style={[styles.label]}>当前状态</Text>
            </View>
            <View style={[globalStyle.flex1, globalStyle.flexJstStart, globalStyle.flexAliStart]}>
              {/* stepItem */}
              <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstStart, globalStyle.flexAliStart, styles.stepItem]}>
                <View style={styles.circle}></View>
                <View>
                  <Text style={{ color: '#999999', fontSize: 14 }}>发起提现</Text>
                  <Text style={{ color: '#999999', fontSize: 14 }}>{route.params.isRecord ? route.params?.target?.create_time : ''}</Text>
                </View>
              </View>
              {/* stepItem */}
              <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstStart, globalStyle.flexAliStart, styles.stepItem]}>
                <View style={route.params?.target.status > 0 ? styles.circle : styles.circleC}></View>
                <View>
                  <Text style={{ color: '#999999', fontSize: 14 }}>银行处理中</Text>
                </View>
              </View>
              {/* stepItem */}
              {
                route.params?.target.status > 0 ?
                  (
                    <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstStart, globalStyle.flexAliStart, styles.stepItem]}>
                      <View style={styles.circleC}></View>
                      <View>
                        <Text style={{ color: '#999999', fontSize: 14 }}>
                          {route.params?.target.status === 1 ? '已入账' : '提现失败'}
                        </Text>
                        <Text style={{ color: '#999999', fontSize: 14 }}>{route.params?.target?.update_time}</Text>
                      </View>
                    </View>
                  ) : null
              }
            </View>
          </View>
          {/* detail */}
          <View style={[globalStyle.flexRow, globalStyle.flexJstStart, globalStyle.flexAliStart, globalStyle.paColSm]}>
            <View style={[globalStyle.selfStretch, globalStyle.flexJstStart, globalStyle.flexAliStart, styles.labelContainer]}>
              <Text style={[styles.label]}>提现金额</Text>
            </View>
            <Text style={styles.label}>￥{route.params?.target.amount}</Text>
          </View>
          <View style={[globalStyle.flexRow, globalStyle.flexJstStart, globalStyle.flexAliStart, globalStyle.paColSm]}>
            <View style={[globalStyle.selfStretch, globalStyle.flexJstStart, globalStyle.flexAliStart, styles.labelContainer]}>
              <Text style={[styles.label]}>服务费</Text>
            </View>
            {
              route.params.isRecord ?
                (<Text style={styles.label}>￥{route.params?.target.service_fee || 0}</Text>) : null
            }
          </View>
          <View style={[globalStyle.flexRow, globalStyle.flexJstStart, globalStyle.flexAliStart, globalStyle.paColSm]}>
            <View style={[globalStyle.selfStretch, globalStyle.flexJstStart, globalStyle.flexAliStart, styles.labelContainer]}>
              <Text style={[styles.label]}>提现单号</Text>
            </View>
            {
              route.params.isRecord ?
                (<Text style={styles.label}>{route.params?.target.order_id}</Text>) : null
            }
          </View>
          {/* Button */}
          {
            !route.params.isRecord ?
              (
                <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstCenter, globalStyle.flexAliCenter, globalStyle.paLg]}>
                  <View style={[globalStyle.fullWidth]}>
                    <Button title="完成"
                      onPress={() => navigation.navigate('Index')}
                      buttonStyle={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#D8D8D8' }}
                      titleStyle={{ color: '#333333' }}
                    />
                  </View>
                </View>
              ) : null
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  labelContainer: {
    width: 80
  },
  label: {
    color: '#999999',
    fontSize: 14
  },
  stepItem: {
    marginBottom: 40
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FEEEEC',
    marginTop: 5,
    marginRight: 25
  },
  circleC: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4A44',
    marginTop: 5,
    marginRight: 25
  }
})