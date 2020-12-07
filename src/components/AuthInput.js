import React from  'react'
import {View, TextInput, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default props =>{
    return (
        <View style={[styles.container, props.style]}>
            <Icon name={props.icon} size={20} style={styles.icon} />
            <TextInput {...props} style={styles.input}/>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 40,
        backgroundColor: '#EEE',
        borderRadius:20,
        flexDirection: 'row',//faz o icon ficar um do lado do outro, nao padrao
        alignItems: 'center', //eixo cruzado ficar centralizado  
    },
    icon:{
        color:'#333',
        marginLeft: 30,

    },
    input:{
        marginLeft: 20,
        width: '70%'
    }
})