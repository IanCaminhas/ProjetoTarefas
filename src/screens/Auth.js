import React, {Component} from 'react'
import {
        ImageBackground, 
        Text, 
        StyleSheet, 
        View, 
        TextInput, 
        TouchableOpacity,
        Platform
} from 'react-native' 

import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../CommonStyle' 

export default class Auth extends Component {
    
    state ={
        name:'',
        email:'',
        password: '',
        confirmPassword:'',
        stageNew: true //atributo que diz se o usuário está logando ou criando novo usuário

    }
    
    render(){
        return (
            <ImageBackground source={backgroundImage}
                style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View styles={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie a sua conta': 'Informe seus dados'}
                    </Text>

                    {this.state.stageNew &&
                        <TextInput placeholder='Nome' value={this.state.name} 
                            style={styles.input} 
                            onChangeText={name => this.setState({name})}/>
                    }
                    <TextInput placeholder='E-mail' value={this.state.email} 
                        style={styles.input} 
                        onChangeText={email => this.setState({email})}/>
                    <TextInput placeholder='Senha' value={this.state.password} 
                        style={styles.input} secureTextEntry={true}
                        onChangeText={password => this.setState({password})}/>
                    {this.state.stageNew &&
                         <TextInput placeholder='Confirmação de Senha' 
                         value={this.state.confirmPassword} 
                         style={styles.input} secureTextEntry={true}
                         onChangeText={confirmPassword => this.setState({confirmPassword})}/>
                    }
                    <TouchableOpacity>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar': 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

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
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize:20,
        textAlign: 'center',
        marginBottom: 10
    },
    input:{
        marginTop:10,
        backgroundColor:'#FFF',
        padding: Platform.OS == 'ios' ? 15 : 10

    },
    formContainer:{
        backgroundColor:'rgba(0,0,0,0.8)', //transparência
        padding: 20, //margem dentro do componente para o input não ficar grudado na borda
        width: '90%', //tamanho do form

    },
    button:{
        backgroundColor:'#080',
        marginTop:10, //pra ficar afastado do input
        padding:10,
        alignItems: 'center',//no cross axis, o item vai ser alinhado no eixo central
    },

    buttonText:{
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }



})