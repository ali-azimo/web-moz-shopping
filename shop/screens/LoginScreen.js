import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native';
import React, {useState} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const logoImg = require('../img/imgLogo.png');

const LoginScreen = () => {
    //Validation
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const handleLogin = () => {
        const user = {
            email:email,
            password: password,
        }
        axios.post("http://10.0.2.2:8000/login", user)
            .then((response) => {
            console.log(response);
            const token = response.data.token;
            AsyncStorage.setItem("authToken", token);
            navigation.replace("Home");
        })
            .catch((error) => {
                Alert.alert("Login Error", "Invalid Email");
                console.log(error);
        })
    }

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
                    }}
                  >
                      Login to your Account
                  </Text>
              </View>

              <View style={{marginTop:70}}>
                  <View
                      style={{
                          flexDirection: "row",
                          alignItems: 'center',
                          gap: 5,
                          backgroundColor: "#CCCC",
                          paddingVertical: 5,
                          borderRadius: 5,
                          marginTop: 30,
                  }}
                  >
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
                          marginTop: 30,
                  }}
                  >
                    <Feather style={{marginLeft:8}}  name="lock" size={30} color="black" />                      
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
                onPress={handleLogin}
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
                  }}>Login</Text>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate("Register")}
                  style={{ marginTop: 15 }}>
                  <Text style={{ textAlign:'center', color:"gray", fontSize:16}}>Ainda não estas registado? Crie agora!</Text>
              </Pressable>
          </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})