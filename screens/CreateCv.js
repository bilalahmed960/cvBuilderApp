import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'

 // add the Ngrok created link to the below Url eg-->
 //const Url="http://9bc4a20e9985.ngrok.io"
 const Url=""
 const Url="http://9bc4a20e9985.ngrok.io"

const CreateEmployee = ({ navigation, route }) => {
    const getDetails = (type) => {
        if (route.params) {
            switch (type) {
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "email":
                    return route.params.email
                case "salary":
                    return route.params.salary
                case "picture":
                    return route.params.picture
                case "position":
                    return route.params.position
                case "bio":
                    return route.params.bio
                case "education":
                    return route.params.education
                case "project":
                    return route.params.project
            }
        }
        return ""
    }
    const [name, setName] = useState(getDetails("name"))
    const [phone, setPhone] = useState(getDetails("phone"))
    const [email, setEmail] = useState(getDetails("email"))
    const [salary, setSalary] = useState(getDetails("salary"))
    const [picture, setPicture] = useState(getDetails("picture"))
    const [position, setPosition] = useState(getDetails("position"))
    const [bio, setBio] = useState(getDetails("bio"))
    const [education, setEducation] = useState(getDetails("education"))
    const [project, setProject] = useState(getDetails("project"))
    const [modal, setModal] = useState(false)
    const [enableshift, setenableShift] = useState(false)

    const submitData = () => {
        fetch(`${Url}/send-data`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                salary,
                picture,
                position,
                bio,
                education,
                project
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                Alert.alert(`${data.name} is saved successfuly`)
                navigation.navigate("Home")
            }).catch(err => {
                Alert.alert("something went wrong")
            })
    }
    const updateDetails = () => {
        fetch(`${Url}/update`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: route.params._id,
                name,
                email,
                phone,
                salary,
                picture,
                position,
                bio,
                education,
                project
            })
        })
            .then(res => res.json())
            .then(data => {
                Alert.alert(`${data.name} is updated successfuly`)
                navigation.navigate("Home")
            })
            .catch(err => {
                Alert.alert("someting went wrong")
            })
    }

    const pickFromGyallery = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newFile = {
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`
                }
                handleUpload(newFile)
            }
        } else {
            Alert.alert("Access Denied")
        }
    }

    const pickFromCamera = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA)
        if (granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newFile = {
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`
                }
                handleUpload(newFile)
            }
        } else {
            Alert.alert("Access Denied")
        }
    }
    const handleUpload = (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'cvBuilderApp')
        data.append("cloud_name", "dtsivtryd")

        fetch("https://api.cloudinary.com/v1_1/dtsivtryd/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).
            then(data => {
                console.log(data)
                setPicture(data.url)
                setModal(false)
            }).catch(err => {
                Alert.alert("Error while uploading")
            })
    }
    return (
        <ScrollView>
            <View style={Styles.Root}>
                <Card style={Styles.myCard}>
                    <Text>Personl Info</Text>
                    <TextInput
                        style={Styles.inputStyle}
                        theme={theme}
                        label="Name"
                        mode="outlined"
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                    <TextInput
                        style={Styles.inputStyle}
                        theme={theme}
                        label="Email"
                        mode="outlined"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        style={Styles.inputStyle}
                        theme={theme}
                        label="Phone"
                        mode="outlined"
                        keyboardType="number-pad"
                        value={phone}
                        onChangeText={text => setPhone(text)}
                    />
                    <TextInput
                        style={Styles.inputStyle}
                        theme={theme}
                        label="Salary"
                        mode="outlined"
                        value={salary}
                        onChangeText={text => setSalary(text)}
                    />
                    <TextInput
                        style={Styles.inputStyle}
                        theme={theme}
                        label="Position"
                        mode="outlined"
                        value={position}
                        onChangeText={text => setPosition(text)}
                    />
                </Card>
                <Card style={Styles.myCard}>
                    <Text>Work Details</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={5}
                        style={Styles.inputStyle}
                        theme={theme}
                        label="Bio"
                        mode="outlined"
                        value={bio}
                        onChangeText={text => setBio(text)}
                    />

                    <TextInput
                        multiline={true}
                        numberOfLines={5}
                        style={Styles.inputStyle}
                        theme={theme}
                        label="Education"
                        mode="outlined"
                        value={education}
                        onChangeText={text => setEducation(text)}
                    />
                    <TextInput
                        multiline={true}
                        numberOfLines={5}
                        style={Styles.inputStyle}
                        theme={theme}
                        label="Projects"
                        mode="outlined"
                        value={project}
                        onChangeText={text => setProject(text)}
                    />
                </Card>
                <Button style={Styles.inputStyle}
                    theme={theme}
                    icon="upload" mode="contained" onPress={() => setModal(true)}>
                    Upload Image
                </Button>
                {route.params ?
                    <Button
                        style={Styles.inputStyle}
                        icon="content-save"
                        mode="contained"
                        theme={theme}
                        onPress={() => updateDetails()}>
                        Update details
             </Button>
                    :
                    <Button
                        style={Styles.inputStyle}
                        icon="content-save"
                        mode="contained"
                        theme={theme}
                        onPress={() => submitData()}>
                        save
             </Button>
                }
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                        setModal(false)
                    }}
                >
                    <View style={Styles.modalView}>
                        <View style={Styles.modalBttnView}>
                            <Button theme={theme}
                                icon="image-area" mode="contained" onPress={() => pickFromCamera()}>Camera</Button>
                            <Button theme={theme}
                                icon="camera" mode="contained" onPress={() => pickFromGyallery()}>Gyallery</Button>
                        </View>
                        <Button theme={theme} onPress={() => setModal(false)}>Cancel</Button>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    )
}

const theme = {
    colors: {
        primary: "#019386"
    }
}
const Styles = StyleSheet.create({
    root: {
        flex: 1
    },
    inputStyle: {
        margin: 5,
        borderRadius: 15,
        elevation: 1,
        marginHorizontal: 25
    },
    myCard: {
        margin: 5,
        marginHorizontal: 15,
        padding: 6,
        borderRadius: 15,
        elevation: 3,
        marginBottom: 16
    },
    modalView: {
        position: "absolute",
        bottom: 2,
        backgroundColor: "lightgrey",
        width: "100%"
    },
    modalBttnView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,

    }
})
export default CreateEmployee