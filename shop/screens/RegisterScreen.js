import { StyleSheet, Text, View, SafeAreaView, Pressable, KeyboardAvoidingView, TextInput, Image, Alert } from 'react-native';
import React, {useState} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const logoImg = require('../img/imgLogo.png');


const RegisterScreen = () => {
    //Validation
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    //Register function
    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password,
        };
        //Send a Post request to the backend API
        axios
            .post("http://10.0.2.2:8000/register",user)
            .then((response) => {
                console.log(response);
                Alert.alert(
                    "Registration Suscesfully",
                    "You have registered successfully"
                );
                setName("");
                setEmail("");
                setPassword("");
            })
            .catch((error) => {
                Alert.alert(
                    "Registration Error",
                    "An error occured during registration"
                );
             console.log("Registration failed", error);
        });        
    };
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"white", alignItems: "center", marginTop: 20}}>
    <View>
        <Image
          style={{width: 150, height: 100}}
            source={logoImg}
        />
    </View>
    
    <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginTop: 12,
                    color: "#041F42",
                    fontFamily: "Ubuntu",
              }}>
                Regsiter your Account
            </Text>
        </View>
              <View style={{ marginTop: 40 }}>
              <View style={{marginTop:15}}>
        <View
            style={{
                flexDirection: "row",
                alignItems: 'center',
                gap: 5,
                backgroundColor: "#CCCC",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 20,
            }}>
                <Entypo  style={{marginLeft:8}} name="users" size={24} color="black" />
                
                <TextInput
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={{ color: "gray", marginVertical: 10, width: 300,fontSize:name ? 18 : 18 }}
                    placeholder='Digite seu nome' />
            </View>
                  </View>
                  
            <View
                style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    gap: 5,
                    backgroundColor: "#CCCC",
                    paddingVertical: 5,
                    borderRadius: 5,
                    marginTop: 30,}}>
                <MaterialCommunityIcons style={{marginLeft:8}} name="email" size={24} color="gray" />
                
                <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={{ color: "gray", marginVertical: 10, width: 300, fontSize:email ? 18 : 18 }}
                    placeholder='Digite o seu Email' />
            </View>
        </View>
        <View style={{marginTop:15}}>
        <View
            style={{
                flexDirection: "row",
                alignItems: 'center',
                gap: 5,
                backgroundColor: "#CCCC",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 20,
            }}>      
            <Feather style={{marginLeft:8}}  name="lock" size={30} color="black"/>                      
                <TextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                    style={{ color: "gray", marginVertical: 10, width: 300,fontSize:password ? 18 : 18 }}
                    placeholder='Digite sua senha' />
            </View>
        </View>
        <View
            style={{
                marginTop: 17,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: "space-between",
                fontSize: 16,
            }}
        >
            <Text>Fazer login</Text>
            <Text style={{color:'#007fff', fontWeight:600}}>Esqueceu a senha</Text>
        </View>
        
        <View style={{ marginTop: 80 }} />
        <Pressable
            onPress={handleRegister}
            style={{
                width: 300,
                backgroundColor: "#1A1A1A",
                borderRadius: 6,
                padding: 15,
                marginLeft: "auto",
                marginRight: "auto"}}>               
            <Text style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                letterSpacing: 3
            }}>Cadastrar-se</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.goBack()}
            style={{ marginTop: 15 }}>
            <Text style={{ textAlign:'center', color:"gray", fontSize:16}}>Já estas resgistado? Faça o Login!</Text>
        </Pressable>
    </KeyboardAvoidingView>
</SafeAreaView>
  )
}
export default RegisterScreen;

const styles = StyleSheet.create({});