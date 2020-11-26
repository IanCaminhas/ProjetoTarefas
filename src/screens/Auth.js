import React, {Component} from 'react'
import {ImageBackground, Text, StyleSheet} from 'react-native' 

import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../CommonStyle' 

export default class Auth extends Component {
    render(){
        return (
            <ImageBackground source={backgroundImage}
                style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
            </ImageBackground>
        )
    }
}


const styles = StyleSheet.create({
    background:{
        flex: 1, //ocupa a tela inteira
        width: '100%', //vai garantir a ocupação de 100% do espaço
        alignItems: 'center', //alinhar no cross axis de forma central
        justifyContent:'center' //alinhar no main axis de forma central
    },


    title:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize:70,
        marginBottom:10 //separa o formulário logo abaixo do título
    },


})