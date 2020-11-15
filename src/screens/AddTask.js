import React, {Component} from 'react'
import {
    Modal,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Platform
} from 'react-native'

import moment from 'moment'
import commonStyles from '../CommonStyle'

import DateTimePicker from '@react-native-community/datetimepicker'

const initialState= {desc: '', date: new Date(), showDatePicker: false}

export default class addTask extends Component {

    state ={
        ...initialState
    }

    save = () =>{

        //Posso fazer isso aqui
        //const newTask = {
            //...initialState
        //}
        
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }

        //quando a função estiver setada em (this.props.onSave), chama a função
        //isso é importante para não chamar função que não existe
        this.props.onSave && this.props.onSave(newTask) 

        //reiniciar o estado do modal
        this.setState({...initialState})

    }

    getDateTimePicker = () =>{
        let datePicker = <DateTimePicker value={this.state.date}
            onChange={(_,date)=> this.setState({date, showDatePicker:false})}
            mode='date'/>

        const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')

        if(Platform.OS==='android'){
            datePicker =(
                <View>
                    <TouchableOpacity onPress={()=>this.setState({showDatePicker: true})}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
                            
        }
        return datePicker
    }


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
                <TextInput style={styles.input} 
                    placeholder="Informe a Descrição..."
                    onChangeText={desc => this.setState({desc})}
                    value={this.state.desc}
                    />
                {this.getDateTimePicker()}
                <View style= {styles.buttons}>
                    <TouchableOpacity onPress={this.props.onCancel}>
                        <Text style={styles.button}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.save}>
                        <Text style={styles.button}>Salvar</Text>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize:18
    },

    input: {
        fontFamily: commonStyles.fontFamily,
        height:40,
        margin:15,
        backgroundColor: '#FFF',
        borderWidth:1,
        borderColor: '#E3E3E3',
        borderRadius:6
    },

    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button:{
        margin:20,
        marginRight:30,
        color: commonStyles.colors.today
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15
    },

})