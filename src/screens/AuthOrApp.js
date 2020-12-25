import React, {Component} from 'react'
import {
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native'

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

export default class AuthOrApp extends Component {
    //ciclo de vida do componente
    //quando o componente for montado, pegar o token e direcionar para a tela de acordo com o token
    
    //componentDidMount=async()=> {}
    
    
    componentDidMount=async()=> {
        const userDataJson = await AsyncStorage.getItem('userData')
        const userData = null

        try {
            userData = JSON.parse(userDataJson)
        }catch(e){
            //userData está inválido, pois o token não foi recebido
        }

        //se userData e userData.token não forem null, setta o header do Authorization
        //motivo: para que toda requisição o token esteja acessível
        if(userData && userData.token){
            axios.defaults.headers.common['Authorization']= `bearer ${userData.token}`
            this.props.navigation.navigate('Home', userData)
        }else {
            //caso não tiver o token, vai para a tela de autenticação
            this.props.navigation.navigate('Auth')
        }
    }
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