import React from 'react';
import { StyleSheet, StatusBar, ScrollView, Text, View, Image, FlatList, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons, Octicons, AntDesign, Entypo } from '@expo/vector-icons';
import {widthToDp,HeightToDp} from '../Responsive'


const Profile = (props) => {

    const { _id, name, email, picture, salary, phone, position, bio, education, project } = props.route.params.item
    const deleteEmploye = () => {
        fetch("http://e8d61e58a27a.ngrok.io/delete", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _id
            })
        })
            .then(res => res.json())
            .then(deletedEmp => {
                Alert.alert(`${deletedEmp.name} deleted`)
                props.navigation.navigate("Home")
            })
            .catch(err => {
                Alert.alert("someting went wrong")
            })
    }
    return (
        <View style={style.root}>
            <LinearGradient
                colors={["#019386", "#00887A"]}
                style={{ height: "15%" }}
            />
            <View style={{ alignItems: "center" }} >
                <Image
                    style={{ width: 120, height: 120, borderRadius: 120 / 2, marginTop: -60 }}
                    source={{ uri: picture }} />
            </View>
            <ScrollView>
                <View style={{ alignItems: "center", margin: 2 }}>
                    <Title>{name}</Title>
                    <Text style={{ fontSize: 15 }}>{position}</Text>
                </View>
                <Card style={style.myCard}>
                    <View style={style.cardContent}>
                        <MaterialIcons name="email" size={20} color="#019386" />
                        <Text style={style.myText}>{email}</Text>
                    </View>
                </Card>
                <Card style={style.myCard}>
                    <View style={style.cardContent}>
                        <Entypo name="phone" size={20} color="#019386" />
                        <Text style={style.myText}>{phone}</Text>
                    </View>
                </Card>
                <Card style={style.myCard}>
                    <View style={style.cardContent}>
                        <MaterialIcons name="attach-money" size={20} color="#019386" />
                        <Text style={style.myText}>{salary}</Text>
                    </View>
                </Card>
                <Card style={style.myCard1}>
                    <View >
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 8 }}>
                            <Text style={style.myText}>
                                Bio
                        </Text>
                            <AntDesign name="user" size={20} color="#019386" />
                        </View >
                        <View style={{ marginVertical: 8 }}>
                            <Text style={{ color: "#a4a4a4" }}>{bio}</Text>
                        </View>
                    </View>
                </Card>
                <Card style={style.myCard1}>
                    <View >
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 8 }}>
                            <Text style={style.myText}>
                                Education
                        </Text>
                            <MaterialCommunityIcons name="pen" size={20} color="#019386" />
                        </View >
                        <View style={{ marginVertical: 8 }}>
                            <Text style={{ color: "#a4a4a4" }}>{education}</Text>
                        </View>
                    </View>
                </Card>
                <Card style={style.myCard1}>
                    <View >
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 8 }}>
                            <Text style={style.myText}>
                                Projects
                        </Text>
                            <Octicons name="project" size={20} color="#019386" />
                        </View >
                        <View style={{ marginVertical: 8 }}>
                            <Text style={{ color: "#a4a4a4" }}>{project}</Text>
                        </View>
                    </View>
                </Card>
                <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 20 }} >
                    <Button theme={theme}
                        icon="account-edit" mode="contained" onPress={() => {
                            props.navigation.navigate("Create",
                                { _id, name, email, picture, salary, phone, position, bio, education, project }
                            )
                        }}>Edit     </Button>
                    <Button theme={theme}
                        icon="delete" mode="contained" onPress={() => deleteEmploye()}>Delete</Button>
                </View>
            </ScrollView>
        </View>

    )
}
const theme = {
    colors: {
        primary: "#019386"
    }
}

const style = StyleSheet.create({
    root: {
        flex: 1
    }, myCard: {
        margin: 5,
        borderRadius: 15,
        elevation: 2,
        marginHorizontal: 25
    },
    myCard1: {
        margin: 5,
        marginHorizontal: 25,
        padding: 20,
        borderRadius: 15,
        elevation: 3,
        marginTop: 10
    },
    cardContent: {
        flexDirection: "row",
        padding: 8

    }, myText: {
        fontSize: 18,
        marginTop: 3,
        marginLeft: 3
    }
})
export default Profile