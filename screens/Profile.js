import React from 'react';
import { StyleSheet, Text, View, Image,FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Title,Card,Button} from 'react-native-paper';
import { MaterialIcons,Entypo } from '@expo/vector-icons';

const Profile = (props)=>{
    
    const {id,name,email,picture,salary,phone,position} = props.route.params.item
    return(
        <View style={style.root}>
            <LinearGradient 
            colors={["#0033ff","#6bc1ff"]}
            style={{height:"20%"}}
            />
            <View style={{alignItems:"center"}} > 
            <Image 
            style={{width:140,height:140,borderRadius:140/2,marginTop:-50}}
            source={{uri:"https://images.unsplash.com/photo-1565464027194-7957a2295fb7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"}} />
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
                            icon="account-edit" mode="contained" onPress={() => console.log("Pressed")}>Edit CV</Button>
                <Button theme={theme}
                            icon="delete" mode="contained" onPress={() => console.log("Pressed")}>Delete CV</Button>
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