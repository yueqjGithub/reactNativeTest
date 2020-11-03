import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast, { DURATION } from 'react-native-easy-toast'
import { globalStyle } from '../../globalStyle';
import LinearGradient from 'react-native-linear-gradient';
import Storage from '../../utils/storage'
import HeadBar from './pageHeader';
import http from '../../utils/myFetch'
import urls from '../../utils/urls'

const LoginPage = ({ navigation }) => {
  const [mobile, setMobile] = useState();
  const [code, setCode] = useState();
  const [mobileReg, setMobileReg] = useState(true);
  const [codeIsNull, setCodeIsNull] = useState(false);
  const [codeLimit, setCodeLimit] = useState(60);
  const [codeQuery, setCodeQuery] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const saveLimit = useRef();
  const toastRef = useRef(null)
  const mobileRegExp = /^[1][3,4,5,7,8][0-9]{9}$/;

  useEffect(() => {
    saveLimit.current = codeLimit;
  }, [codeLimit]);

  useEffect(() => {
    Storage.load({
      key: 'userInfo'
    }).then(() => {
      navigation.navigate('Index')
    }).catch(() => {
      console.log('未登录')
    })
  }, [])

  const toIndex = () => {
    navigation.navigate('Index');
  };

  const checkMobile = (val) => {
    if (!mobileRegExp.test(val)) {
      setMobileReg(false);
    } else {
      setMobileReg(true);
      setMobile(val);
    }
  };

  const checkCodeIsNull = () => {
    if (!code) {
      setCodeIsNull(true);
    }
  };
  const checkCode = (val) => {
    if (val) {
      setCode(val);
      setCodeIsNull(false);
    } else {
      setCodeIsNull(true);
    }
  };
  // 获取验证码
  const queryCode = async () => {
    setCodeQuery(true)
    const res = await http.post(urls.queryValiCode, { mobile: mobile })
    setCodeQuery(false)
    if (res.code === 'success') {
      toastRef.current.show(res.msg, 1500)
      let int = setInterval(() => {
        if (saveLimit.current <= 60 && saveLimit.current > 0) {
          setCodeLimit(--saveLimit.current);
        } else {
          clearInterval(int);
          setCodeLimit(60);
        }
      }, 1000);
    } else {
      toastRef.current.show(res.msg)
    }
  };

  // 短信登录
  const codeLogin = async () => {
    const obj = {
      mobile: mobile,
      code: code
    }
    setLoginLoading(true)
    const res = await http.post(urls.codeLogin, obj).catch(err => {
      console.log(err)
    })
    setLoginLoading(false)
    if (res.code === 'success') {
      // 登录成功
      Storage.save({
        key: 'userInfo',
        data: {
          token: res.token,
          userid: res.userid,
          openid: res.openid
        }
      })
      navigation.navigate('Index')
    } else {
      toastRef.current.show(res.msg, 2000)
    }
  }

  return (
    <SafeAreaView>
      <View
        style={[
          globalStyle.paRowMd,
          globalStyle.bgWhite,
          globalStyle.fillScreen,
        ]}>
        <HeadBar/>
        <Text style={[style.label, globalStyle.paColSm]}>手机号码</Text>
        <View>
          <TextInput
            style={{fontSize: 14, fontFamily: 'DINEngschrift'}}
            onChangeText={(param) => checkMobile(param)}
            placeholder="请输入手机号"
          />
          <Text style={style.hint}>{mobileReg ? '' : '手机号格式错误'}</Text>
        </View>
        {/* 验证码 */}
        <Text style={[style.label, globalStyle.paColSm]}>验证码</Text>
        <View>
          <View
            style={[
              globalStyle.flexRow,
              globalStyle.flexJstBtw,
              globalStyle.flexAliCenter,
            ]}>
            <View style={globalStyle.flex3}>
              <TextInput
                style={{fontSize: 14, fontFamily: 'DINEngschrift'}}
                onChangeText={(val) => checkCode(val)}
                onBlur={() => checkCodeIsNull()}
                placeholder="请输入验证码"
              />
            </View>
            <View style={globalStyle.flex1}>
              <Button
                loading={codeQuery}
                title={codeLimit === 60 ? '获取' : `${codeLimit}s`}
                buttonStyle={{ backgroundColor: '#393939', color: '#ffffff' }}
                onPress={() => queryCode()}
                disabled={codeLimit < 60 || !mobileReg || !mobile}
              />
            </View>
          </View>
          <Text style={style.hint}>{!codeIsNull ? '' : '请输入验证码'}</Text>
        </View>
        {/*登录按钮Container*/}
        <View style={[style.btnContainer, globalStyle.flexJstCenter, globalStyle.flexAliCenter]}>
          <View style={[style.btnItem]}>
            <Button title="登录" onPress={() => toIndex()} disabled={!mobile || !code || !mobileReg || loginLoading} buttonStyle={{ backgroundColor: '#EF4A44', color: '#ffffff' }}
            onPress={() => codeLogin()} loading={loginLoading}
            />
          </View>
          <View style={[style.btnItem, globalStyle.paColMd]}>
            <Button title="微信授权登录" onPress={() => {}} buttonStyle={{color: '#ffffff'}}
            icon={
              <Image source={require('../../assets/images/weixin.png')} style={{width: 21,height: 17, marginRight: 3}}></Image>
            }
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#1D1D1D', '#393939'],
              start: { x: 1, y: 0 },
              end: { x: 0, y: 0.5 },
            }}
            />
          </View>
        </View>
      </View>
      <Toast ref={toastRef} position={'center'}/>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  buttonNoram: {
    color: '#393939',
  },
  label: {
    fontSize: 20,
    color: '#333333',
    fontWeight: 'bold',
  },
  hint: {
    fontSize: 14,
    color: 'red',
  },
  codeBtn: {
    width: 100,
  },
  btnItem: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  btnContainer: {
    marginTop: 80,
    width: '100%',
  },
});
export default LoginPage;
