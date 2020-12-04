import React from 'react';
import { StyleSheet, Text, View, Image,FlatList, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Title,Card,Button} from 'react-native-paper';
import { MaterialIcons,Entypo } from '@expo/vector-icons';

const Profile = (props)=>{
    
    const {_id,name,email,picture,salary,phone,position} = props.route.params.item
    const deleteEmploye = ()=>{
        fetch("http://03b71ffd087e.ngrok.io/delete",{
            method:"post",
            headers:{
             'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id:_id
            })
        })
        .then(res=>res.json())
        .then(deletedEmp=>{
            Alert.alert(`${deletedEmp.name} deleted`)
            props.navigation.navigate("Home")
        })
        .catch(err=>{
         Alert.alert("someting went wrong")
        })
    }
    return(
        <View style={style.root}>
            <LinearGradient 
            colors={["#0033ff","#6bc1ff"]}
            style={{height:"20%"}}
            />
            <View style={{alignItems:"center"}} > 
            <Image 
            style={{width:140,height:140,borderRadius:140/2,marginTop:-50}}
            source={{uri:picture }} />
            </View>
        
            <View style={{alignItems:"center",margin:1}}>
                <Title>{name}</Title>
                <Text style={{fontSize:15}}>{position}</Text>
            </View>
            <Card style={style.myCard}>
                <View style={style.cardContent}>
                <MaterialIcons name="email" size={32} color="#006aff" />
                <Text style={style.myText}>{email}</Text>
                </View>
            </Card>
            <Card style={style.myCard}>
                <View style={style.cardContent}>
                <Entypo name="phone" size={32} color="#006aff" />
                <Text style={style.myText}>{phone}</Text>
                </View>
            </Card>
            <Card style={style.myCard}>
                <View style={style.cardContent}>
                <MaterialIcons name="attach-money" size={32} color="#006aff" />
                <Text style={style.myText}>{salary}</Text>
                </View>
            </Card>
            <View style={{flexDirection:"row",justifyContent:"space-around",padding:10}} >
                <Button theme={theme}
                            icon="account-edit" mode="contained" onPress={() =>{
                                props.navigation.navigate("Create",
                            {_id,name,email,picture,salary,phone,position}
                            )}}>Edit CV</Button>
                <Button theme={theme}
                            icon="delete" mode="contained" onPress={() => deleteEmploye()}>Delete CV</Button>
                </View>
        </View>
        
    )
}
const theme = {
    colors:{
        primary:"#006aff"
    }
}

const style = StyleSheet.create({
    root:{
        flex:1
    },myCard:{
        margin:3
    },
    cardContent:{
        flexDirection:"row",
        padding:8

    },myText:{
        fontSize:18,
        marginTop:3,
        marginLeft:3
    }
})
export default Profile