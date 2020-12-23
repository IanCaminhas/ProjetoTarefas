//Quando usar um código de jsx, é necessário fazer a importação do react
//conversao de código jsx em js, preciso dessa importação
import React from 'react'

import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createDrawerNavigator} from 'react-navigation-drawer'
import Auth from './screens/Auth'
import TaskList from './screens/TaskList' 
import Menu from './screens/Menu'
import commonStyles from  './CommonStyle'

const menuConfig = {
    initialRouteName: 'Today', //primeira tela ao logar
    contentComponent: Menu,
    contentOptions: {
        //quando a opção no drawer estiver não estiver ativa 
        labelStyle: {
            fontFamily: commonStyles.fontFamily,
            fontWeight:'normal',
            fontSize:20
        },
        //quando a opção no drawer estiver ativa
        activeLabelStyle:{
            color:'#080', //verde
            fontWeight:'bold',
        }
    }
}


// daysAhead que vai filtrar a info. Hoje ? 7 dias para frente ? 30 dias para frente ?
const menuRoutes = {
    Today:{
        name:'Today',
        screen: props => <TaskList title='Hoje' daysAhead={0} {...props}/>,
        navigationOptions:{
            title:'Hoje'
        }
    },

    Tomorrow:{
        name:'Tomorrow',
        screen: props => <TaskList title='Amanhã' daysAhead={1} {...props}/>,
        navigationOptions:{
            title:'Amanhã'
        }
    },

    Week:{
        name:'Week',
        screen: props => <TaskList title='Semana' daysAhead={7} {...props}/>,
        navigationOptions:{
            title:'Semana'
        }
    },

    Month:{
        name:'Month',
        screen: props => <TaskList title='Mês' daysAhead={30} {...props}/>,
        navigationOptions:{
            title:'Mês'
        }
    },
}

const menuNavigator = createDrawerNavigator(menuRoutes,menuConfig)

const mainRoutes ={
    Auth:{
        name: 'Auth',
        screen: Auth, //referencia para o componente Auth from './screens/Auth'(import) -> não é trecho de código jsx
        //screen: props => <Auth /> tenho possibilidade de criar uma função que retorna <Auth /> trecho de código jsx
    },
    Home:{
        name: 'Home',
        //screen: TaskList, //import TaskList from './screens/TaskList'
        screen: menuNavigator, //o menuNavigator vai gerir a Home  
    }
}


//meu navegador
const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'Auth' //tela inicial quando o app for carregado
})

export default createAppContainer(mainNavigator)

