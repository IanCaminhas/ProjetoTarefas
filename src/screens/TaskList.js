import React, {Component} from 'react'
import {View, 
        Text, 
        ImageBackground, 
        StyleSheet, 
        FlatList, 
        TouchableOpacity, 
        Platform,
        Touchable,
        Alert} from  'react-native'

import AsyncStorage from "@react-native-community/async-storage"
import commonStyles from '../CommonStyle'
import todayImage from '../../assets/imgs/today.jpg'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from  'axios'
import {server, showError} from '../common'


import moment from  'moment'
import 'moment/locale/pt-br'

import AddTask from './AddTask'

const initialState ={
        showDoneTasks: true,
        visibleTasks:[],
        showAddTask:false,
        tasks:[]
}

export default class TaskList extends Component {

    state ={
        ...initialState       
    }
     
    componentDidMount= async() =>{
        //this.filterTasks()
        const stateString = await AsyncStorage.getItem('tasksState')       
        const savedState = JSON.parse(stateString) || initialState
        this.setState({
            showDoneTasks: savedState.showDoneTasks //dado obtido apartir do asyncStorage 
        }, this.filterTasks) 

        this.loadTasks()

    }

    //funcao responsável por carregar as tarefas
    loadTasks= async () =>{
        try{
            //adicionando dias para termos a formatação condicional ? 0 dias ? 7 dias
            //menuRoutes ->  screen: props => <TaskList title='Hoje' daysAhead={0} {...props}/>,
            const maxDate = moment()
                .add({days: this.props.daysAhead})            
                .format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            //res.data traz as tasks
            this.setState({tasks: res.data}, this.filterTasks)
        }catch(e){
            showError(e)
        }
    }


    toggleFilter = () => {
        this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks)
    }

    filterTasks =() =>{
        let visibleTasks = null
        if(this.state.showDoneTasks){
            visibleTasks = [...this.state.tasks] 
        } else {
            
            const pending = task => task.doneAt ===null
            visibleTasks = this.state.tasks.filter(pending)

        }
        this.setState({visibleTasks})
        AsyncStorage.setItem('tasksState', JSON.stringify({
            showDoneTasks: this.state.showDoneTasks
        }))
        

    }

    // toggleTask = taskId =>{
    //     const tasks =[...this.state.tasks]
    //     tasks.forEach(task =>{
    //         if(task.id==taskId){
    //             task.doneAt = task.doneAt ? null : new Date()
    //         }
    //     })
    //     this.setState({tasks}, this.filterTasks)

    // }

    toggleTask = async taskId =>{
        try{
            //os estados são alternados com ${server}/tasksToggle/${taskId}
            //pendente para concluído e vice-versa 
            await axios.put(`${server}/tasks/${taskId}/toggle`)
            //após a alternância, vai pegar o estado mais novo da aplicação
            this.loadTasks()

        }catch(e){
            showError(e)
        }
    }

    // addTask = newTask =>{
    //     //garantindo que !newTask.desc tem conteúdo
    //     // garantindo que !newTask.desc.trim() só tem espaço em branco
    //     if(!newTask.desc || !newTask.desc.trim()){
    //         Alert.alert('Dados inválidos', 'Descrição não informada!')
    //         return
    //     }
    //     //clonando as tasks 
    //     const tasks = [...this.state.tasks]
    //     //inserindo a task no array
    //     tasks.push({
    //         id: Math.random(),
    //         desc: newTask.desc,
    //         estimateAt: newTask.date,
    //         doneAt: null
    //     })

    //     //atualizando o array de tarefas e fechando o modal com showAddTask
    //     //depois que executar, quero atualizar o filterTasks... ora, tem task nova... ou seja, quero que as tasks tenha essa nova
    //     this.setState({tasks, showAddTask: false }, this.filterTasks)

    // }

    addTask = async newTask =>{
        
        if(!newTask.desc || !newTask.desc.trim()){
            Alert.alert('Dados inválidos', 'Descrição não informada!')
            return
        }

        try{
            await axios.post(`${server}/tasks`, {
                desc:newTask.desc,
                estimateAt: newTask.date,
            })
        
         //showAddTask: false -> quero sumir com o modal
        //depois de sumir com o modal, chamar o callback loadTasks
        //depois de carregar, vou carregar as tarefas com this.loadTasks 
        this.setState({showAddTask: false }, this.loadTasks)

        }catch(e){
            showError(e)
        }
    }

    // deleteTask = taskId =>{
    //     //filtra pra mim todas as tasks que tem o id diferente do id passado
    //     //lembrete: filter gera um novo array
    //     const tasks = this.state.tasks.filter(task => task.id !== taskId)
    //     //garantindo que a task foi excluída das tasks visiveis
    //     this.setState({tasks}, this.filterTasks)
    // }

    deleteTask = async taskId =>{
        try{
            await axios.delete(`${server}/tasks/${taskId}`)
            this.loadTasks()

        }catch(e){
            showError(e)
        }

    }

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} 
                    onCancel={()=> this.setState({showAddTask: false})}
                    onSave= {this.addTask} />
                <ImageBackground source={todayImage} style={styles.background}>

                <View style ={styles.iconBar}>

                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name = 'bars'
                              size= {20} color={commonStyles.colors.secondary} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress= {this.toggleFilter}>
                        <Icon name = {this.state.showDoneTasks ? 'eye': 'eye-slash'}
                              size= {20} color={commonStyles.colors.secondary} />
                    </TouchableOpacity>

                </View>
                
                <View style={styles.titleBar}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
              
                <View style={styles.taskList}>
                    <FlatList data={this.state.visibleTasks} 
                              keyExtractor={item => `${item.id}`}
                              renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask} />}  />
                </View>

                <TouchableOpacity style={styles.addButton}
                activeOpcity={0.7}
                onPress={()=> this.setState({showAddTask:true})}>
                    <Icon name="plus" size={20}
                    color={commonStyles.colors.secondary}/>
                </TouchableOpacity>




            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1 
    },
    background: {
        flex:3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end' //sempre vai mexer com main axis. main axis pode ser a coluna(padrão) ou linha
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 20
    },
    iconBar: {
        flexDirection: 'row', 
        marginHorizontal: 20,
        justifyContent:'space-between', //os dois ícones(filter e drawerNavigator) com espaço no meio
        marginTop: Platform.OS ==='ios' ? 40 : 10

    },
    addButton:{
        position:'absolute',
        right:30,
        bottom:30,
        width:50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems:'center'

    }
    

});

