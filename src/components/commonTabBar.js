import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { globalStyle } from '../globalStyle';

export default CusTab = ({ navigation, route }) => {
    const [curRoute, setCurRoute] = useState(1)
    useEffect(() => {
        setCurRoute(route.name)
    }, [curRoute])

    const tabList = [
        { name: '主页', routeTarget: 'Index', activeIcon: require('../assets/images/homeC.png'), normalIcon: require('../assets/images/homeN.png') },
        { name: '我的', routeTarget: 'Mine', activeIcon: require('../assets/images/mineC.png'), normalIcon: require('../assets/images/mineN.png') }
    ]

    const toPage = (routeName) => {
        navigation.navigate(routeName)
    }

    return (
        <View style={[globalStyle.fullWidth, globalStyle.flexRow, globalStyle.flexJstArd, globalStyle.flexAliCenter]}>
            {
                tabList.map(item => {
                    return (
                        <TouchableHighlight underlayColor={'transparent'} onPress={() => toPage(item.routeTarget)} key={item.name}>
                            <View style={[globalStyle.flexJstArd, globalStyle.flexAliCenter]}>
                                {curRoute === item.routeTarget ?
                                    <Image source={item.activeIcon} style={styles.tabIcon} /> : <Image source={item.normalIcon} style={styles.tabIcon} />
                                }
                                <Text style={curRoute === item.routeTarget ? styles.tabWords : styles.tabsWordsN}>{item.name}</Text>
                            </View>
                        </TouchableHighlight>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    tabIcon: {
        width: 20,
        height: 20
    },
    tabWords: {
        fontSize: 14,
        color: '#333333'
    },
    tabsWordsN: {
        fontSize: 14,
        color: '#D2D2D2'
    }
})