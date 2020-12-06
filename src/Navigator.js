import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import Auth from './screens/Auth'
import TaskList from './screens/TaskList' 

const mainRoutes ={
    Auth:{
        name: 'Auth',
        screen: Auth, //referencia para o componente Auth from './screens/Auth'
    },
    Home:{
        name: 'Home',
        screen: TaskList, //import TaskList from './screens/TaskList' 
    }


}


//meu navegador
const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'Home' //tela inicial quando o app for carregado
})

export default createAppContainer(mainNavigator)

