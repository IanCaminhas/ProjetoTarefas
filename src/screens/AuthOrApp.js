import React, {Component} from 'react'
import {
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native'

export default class AuthOrApp extends Component {
    render() {
        return(
            <View style={styles.container}>
                <ActivityIndicator size='large' />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1, //crescer a tela toda
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000' 
    }
})