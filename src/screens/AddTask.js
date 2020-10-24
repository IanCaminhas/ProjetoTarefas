import React, {Component} from 'react'
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'

export default class addTask extends Component {

    render(){
        return ( 
        <Modal transparent={true} visible={this.props.isVisible}
                onRequiredClose={this.props.onCancel}
                animationType='slide'>
            
            <TouchableWithoutFeedback onPress={this.props.onCancel}>
                <View style={styles.background}>

                </View>
            </TouchableWithoutFeedback>

        </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        backgroundColor: 'rgba(0,0,0, 0.7)'
    }

})