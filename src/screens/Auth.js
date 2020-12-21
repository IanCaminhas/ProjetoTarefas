import React, {Component} from 'react'
import {
        ImageBackground, 
        Text, 
        StyleSheet, 
        View, 
        TouchableOpacity,
        Platform,
        Alert
} from 'react-native' 
import axios from 'axios'

const initialState ={
    name:'',
    email:'ri@gmail.com',
    password: '123456',
    confirmPassword:'',
    stageNew: false //atributo que diz se o usuário está logando ou criando novo usuário
}

import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../CommonStyle' 
import AuthInput from '../components/AuthInput'

import {server, showError, showSuccess} from '../common'

export default class Auth extends Component {
    
    state ={
        ...initialState
    }
    
    signOrSignup = () =>{
        if(this.state.stageNew){
            this.signup()
        }else {
            this.signin()
        }
    }

    signup = async() =>{
        try{
            await axios.post(`${server}/signup`, {
                name:this.state.name,
                email:this.state.email,
                password: this.state.password,
                confirmPassword:this.state.confirmPassword,
            })

            //essa msg vai ser exibida quando o await for finalizado
            showSuccess('Usuário cadastrado!')
            //quando o usuario terminar de cadastrar, alterar para o estado inicial
            this.setState({...initialState})
            
        }catch(e){
            showError(e)
        }
    }


    signin = async () =>{
        try {
            //vou precisar do resultado da resposta...guardo em res
           const res= await axios.post(`${server}/signin`, {
                email:this.state.email,
                password: this.state.password,
            })
            //bearer(portador) -> toda requsição posterior terá o token 
            //Essa String `bearer ${res.data.token}` está setada na header Authorization
            //`bearer ${res.data.token}` authorization será enviada em qualquer nova requisição futura
            axios.defaults.headers.common['Authorization']= `bearer ${res.data.token}`
            
            //caso a autenticação der certo, navegue para a tela Home
            this.props.navigation.navigate('Home')
        }catch(e){
            //caso der erro, chame a exceção
            showError(e)
        }
    }


    render(){
        //esse array vai ter validações. 
        //Cada validação vai retornar True ou False. True que a validação foi realizada de forma correta.
        //False que o formulário ainda não está válido
        const validations = []

        //validacao -> o email tem que ter o arroba
        validations.push(this.state.email && this.state.email.includes('@'))
        
        //a senha tem que ser maior de 6 dígitos
        validations.push(this.state.password && this.state.password >=6)

        if(this.state.stageNew){
            //nome não pode ser null e deve possuir tamanho maior que 3 caratcteres
            validations.push(this.state.name && this.state.name.trim().length> 3)

            //a confirmação de senha tem que existir
            validations.push(this.state.confirmPassword)
            //a senha tem que ser igual à confirmação de senha
            validations.push(this.state.password === this.state.confirmPassword)

        }

        //só tenho um formulário válido se todas as expressões forem verdadeiras
        //se tiver uma validação falsa, o validForm será falso
        const validForm = validations.reduce((t,a)=> t && a)

        return (
            <ImageBackground source={backgroundImage}
                style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View styles={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie a sua conta': 'Informe seus dados'}
                    </Text>

                    {this.state.stageNew &&
                        <AuthInput icon='user' placeholder='Nome' value={this.state.name} 
                            style={styles.input} 
                            onChangeText={name => this.setState({name})}/>
                    }
                    <AuthInput icon='at' placeholder='E-mail' value={this.state.email} 
                        style={styles.input} 
                        onChangeText={email => this.setState({email})}/>
                    <AuthInput icon='lock' placeholder='Senha' value={this.state.password} 
                        style={styles.input} secureTextEntry={true}
                        onChangeText={password => this.setState({password})}/>
                    {this.state.stageNew &&
                         <AuthInput icon='asterisk' placeholder='Confirmação de Senha' 
                         value={this.state.confirmPassword} 
                         style={styles.input} secureTextEntry={true}
                         onChangeText={confirmPassword => this.setState({confirmPassword})}/>
                    }
                    <TouchableOpacity onPress={this.signOrSignup}
                    disabled={!validForm}>
                        <View style={[styles.button, validForm ?{}:{backgroundColor:'#AAA'}]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar': 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{padding: 10}}
                    onPress={() => this.setState({stageNew: !this.state.stageNew})}>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Já possui conta ?': 'Ainda não possui conta ?'}
                    </Text>
                </TouchableOpacity>

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
        borderRadius: 7,

    },

    buttonText:{
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }



})