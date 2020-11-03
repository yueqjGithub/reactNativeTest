import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonTit from '../../components/commonTit';
import { globalStyle } from '../../globalStyle';
import Toast, { DURATION } from 'react-native-easy-toast';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import CustomEarn from './customEarn'
import AgentEarn from './agentEarn'

export default EarnPage = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={[globalStyle.fillScreen, globalStyle.bgWhite]}>
        <CommonTit title={'收益明细'} navigation={navigation} showBackBtn={true}></CommonTit>
        <ScrollableTabView
          style={{marginTop: 18, ...globalStyle.flex1}}
          initialPage={0}
          renderTabBar={() => <DefaultTabBar style={{borderWidth: 0, paddingLeft: 60, paddingRight: 60}}/>}
          tabBarUnderlineStyle={{backgroundColor: 'transparent'}}
          tabBarActiveTextColor='#333333'
          tabBarInactiveTextColor='#999999'
          tabBarTextStyle={{fontSize: 16}}
        >
          <CustomEarn tabLabel='客户提成' style={[globalStyle.fullHeight, globalStyle.paRowMd]}/>
          <CustomEarn tabLabel='代理提成' style={[globalStyle.fullHeight, globalStyle.paRowMd]}></CustomEarn>
        </ScrollableTabView>
      </View>
    </SafeAreaView>
  )
}