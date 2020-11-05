import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight, Image } from 'react-native';
import { Button } from 'react-native-elements';
import CommonTit from '../../components/commonTit';
import { globalStyle } from '../../globalStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import http from '../../utils/myFetch';
import urls from '../../utils/urls';
import Toast, { DURATION } from 'react-native-easy-toast';
import MenuItem from './menuItem';
import CusTab from '../../components/commonTabBar'

const IndexPage = ({ navigation, route }) => {
  const [balance, setBalance] = useState(0)
  const [income, setIncome] = useState(0)
  const [totalIncom, setTotalIncome] = useState(0)
  const toastRef = useRef(null)
  useEffect(() => {
    http.post(urls.queryMine).then(res => {
      console.log(res)
      if (res.membership) {
        setBalance(res.membership.balance)
        setIncome(res.membership.newst_income)
        setTotalIncome(res.membership.total_income)
      }
    }).catch(() => {
      toastRef.current.show('获取个人数据失败', 2000)
    })
  }, [balance, income, totalIncom])

  const toIndex = () => {
    navigation.navigate('Login')
  }

  const MenuMap = [
    {title: '我的客户', img: require('../../assets/images/kehu.png'), routeName: 'Customer'},
    {title: '我的代理', img: require('../../assets/images/daili.png'), routeName: 'Agent'},
    {title: '收益明细', img: require('../../assets/images/shouyi.png'), routeName: 'Earn'},
    {title: '提现记录', img: require('../../assets/images/tixian.png'), routeName: 'WithdrawList'},
    {title: '邀请客户', img: require('../../assets/images/yaoqing.png'), routeName: null},
  ]

  return (
    <SafeAreaView>
      <View style={[globalStyle.fillScreen, globalStyle.bgWhite]}>
        <CommonTit title={'之交会合伙人'} navigation={navigation} showBackBtn={false}></CommonTit>
        {/* <Button title="返回" color="#393939" style={style.buttonNoram} onPress={toIndex}></Button> */}
        <View style={[globalStyle.flexRow, globalStyle.paRowMd, globalStyle.paColLg, globalStyle.flexJstCenter, globalStyle.flexAliCenter]}>
          <ImageBackground source={require('../../assets/images/normalCard.png')} style={{ width: '100%', borderRadius: 5, overflow: 'hidden', ...globalStyle.flexJstBtw, ...globalStyle.flexAliStart }} resizeMethod="scale">
            <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliStart, globalStyle.paColMd]}>
              {/* 余额 */}
              <View style={globalStyle.paRowMd}>
                <Text style={{ fontSize: 14, ...style.cardText }}>余额（元）</Text>
                <Text style={{ fontSize: 24, fontWeight: 'bold', ...style.cardText }}>{balance}</Text>
              </View>
              <View>
                <Button title={'提现'} titleStyle={{ fontSize: 14, ...style.cardText }} buttonStyle={{ height: 30, ...globalStyle.paRowMd }}
                  ViewComponent={LinearGradient}
                  onPress={() => navigation.navigate('Withdraw')}
                  linearGradientProps={{
                    colors: ['#393939', '#1D1D1D'],
                    start: { x: 0, y: 0 },
                    end: { x: 1, y: 0.5 },
                  }}
                ></Button>
              </View>
            </View>
            <View style={[globalStyle.flexRow, globalStyle.flexJstStart, globalStyle.paRowMd, style.maTp]}>
              <Text style={{fontSize: 14,...style.cardText}}>最新收益  +{income}</Text>
              <Text style={{fontSize: 14,marginLeft: 8,...style.cardText}}>累计收益  +{totalIncom}</Text>
            </View>
          </ImageBackground>
        </View>
        {/* menuList */}
        <View style={[globalStyle.paRowMd, globalStyle.flexRow, globalStyle.flexJstCenter, globalStyle.flexAliStart]}>
          <View style={[style.menuList, globalStyle.fullWidth, globalStyle.paMd, globalStyle.flexRow, globalStyle.flexWrap, globalStyle.flexJstStart, globalStyle.flexAliStart]}>
            {MenuMap.map(item => {
              return (
                <MenuItem title={item.title} imgSrc={item.img} target={item.routeName} navigation={navigation} key={item.title}></MenuItem>
              )
            })}
          </View>
        </View>
        {/* share */}
        <View style={[globalStyle.paRowMd, globalStyle.paColLg, globalStyle.flexRow, globalStyle.flexAliCenter]}>
          <TouchableHighlight underlayColor={'transparent'} style={{width: '100%'}} onPress={() => {}}>
            <Image source={require('../../assets/images/share.png')} style={{width: '100%', height: 60}} resizeMethod={'auto'}></Image>
          </TouchableHighlight>
        </View>
        <View style={[style.cusTabStyle, globalStyle.paRowLg, globalStyle.paColMd, globalStyle.flexRow, globalStyle.flexJstCenter, globalStyle.flexAliCenter]}>
          <CusTab navigation={navigation} route={route} /> 
        </View>
      </View>
      <Toast ref={toastRef} position={'center'}/>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  buttonNoram: {
    color: '#393939'
  },
  cardText: {
    color: '#D5C6B1'
  },
  bgCtrl: {
    resizeMode: "contain"
  },
  maTp: {
    marginTop: 18,
    marginBottom: 10
  },
  menuList: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#f8f8f8'
  },
  cusTabStyle: {
    position: "absolute",
    bottom: 0,
    width: '100%',
    // backgroundColor: 'yellow'
    borderTopColor: '#F7F7F7',
    borderTopWidth: 1,
    borderStyle: 'solid'
  }
})
export default IndexPage