import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';

export default CusTab = ({ navigation, route }) => {
    const [curRoute, setCurRoute] = useState(1)
    useEffect(() => {
        setCurRoute(route.name)
    }, [])
    return (
        <View>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: 'red'}}>{curRoute}</Text>
        </View>
    )
}