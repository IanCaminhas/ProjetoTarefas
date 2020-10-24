import React, {Component} from 'react'
import {
    Modal,
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback
} from 'react-native'

import commonStyles from '../CommonStyle'


export default class addTask extends Component {

    render(){
        return ( 
        <Modal transparent={true} visible={this.props.isVisible}
                onRequiredClose={this.props.onCancel}
                animationType='slide'>
            
            <TouchableWithoutFeedback 
                onPress={this.props.onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>

            <View style={styles.container}>
                <Text style={styles.header}>Nova Tarefa</Text>
            </View>

            <TouchableWithoutFeedback 
                onPress={this.props.onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>

        </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        backgroundColor: 'rgba(0,0,0, 0.7)'
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize:18
    }

})