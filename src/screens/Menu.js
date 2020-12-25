import React from 'react'
import {Platform,ScrollView, View, Text, StyleSheet, TouchableOpacity}from 'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import {Gravatar} from 'react-native-gravatar'
import commonStyles from '../CommonStyle' 
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'

export default props =>{

    const logout =() =>{
        //deletando o cabeçalho contendo o token
        axios.defaults.headers.common['Authorization']
        //remover registro no AsyncStorage
        AsyncStorage.removeItem('userData')
        //navegar para AuthOrApp quando fazer logout
        props.navigation.navigate('AuthOrApp')
    }

    return (
        //informações do usuário logado
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
                <Gravatar styles={styles.avatar} 
                options={{
                    //lembra quando passei pelo navigator a resposta. Isso no method signin             
                    //this.props.navigation.navigate('Home', res.data)
                    email: props.navigation.getParam('email'),
                    secure:true
                }}/>   

                <View style={styles.userInfo}>
                    <Text style={styles.name}>
                        {props.navigation.getParam('name')}
                    </Text>
                    <Text style={styles.email}>
                        {props.navigation.getParam('email')}
                    </Text>
                </View> 
                <TouchableOpacity onPress={logout}>
                    <View style={styles.logoutIcon}>
                        <Icon name='sign-out' size={30} color='#800' />
                    </View>

                </TouchableOpacity>
            </View>
            <DrawerItems {...props} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header:{
        borderBottomWidth:1,
        borderColor:'#DDD'
    },
    title:{
        color:'#000',
        fontFamily: commonStyles.fontFamily,
        fontSize:30,
        marginTop: Platform.OS ==='ios' ? 70 : 30,
        padding:10
        
    },
    avatar:{
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius:30,
        margin:10,
        backgroundColor: '#222',
    },
    userInfo:{
        marginLeft:10,
        flexDirection:'row'
    },
    name:{
        fontFamily: commonStyles.fontFamily,
        fontSize:20,
        marginBottom: 5, //espaço entre o nome do usuário e o email
        color: commonStyles.colors.Text

    }, 
    email:{
        fontFamily: commonStyles.fontFamily,
        fontSize:15,
        color: commonStyles.colors.subText,
        marginBottom: 10,
    },
    logoutIcon:{
        marginLeft:10,
        marginBottom: 10

    }

})

