import React,{useState} from 'react';
import { StyleSheet, Text, View,Modal,Alert} from 'react-native';
import {TextInput,Button} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'

const CreateEmployee = ()=>{
    const[ Name,setName] = useState("")
    const[ Phone,setPhone] = useState("")
    const[ Email,setEmail] = useState("")
    const[ Salary,setSalary] = useState("")
    const[ Profilepic,setProfilepic] = useState("")
    const[ modal,setModal] = useState(false)
    
    const pickFromGyallery = async ()=>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if (granted){
                let data = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes:ImagePicker.MediaTypeOptions.Images,
                    allowsEditing:true,
                    aspect:[1,1],
                    quality:0.5
                })
                if(!data.cancelled){
                    let newFile = {
                        uri:data.uri,
                        type:`test/${data.uri.split(".")[1]}`,
                        name:`test.${data.uri.split(".")[1]}`
                    }
                    handleUpload(newFile) 
                }
            }else{
                Alert.alert("Access Denied")
            }
    }
    const pickFromCamera = async ()=>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA)
            if (granted){
               let data = await ImagePicker.launchCameraAsync({
                    mediaTypes:ImagePicker.MediaTypeOptions.Images,
                    allowsEditing:true,
                    aspect:[1,1],
                    quality:0.5
                })
                if(!data.cancelled){
                    let newFile = {
                        uri:data.uri,
                        type:`test/${data.uri.split(".")[1]}`,
                        name:`test.${data.uri.split(".")[1]}`
                    }
                    handleUpload(newFile) 
                }
            }else{
                Alert.alert("Access Denied")
            }
    }
    const handleUpload = (image)=>{
        const data = new FormData()
        data.append('file',image)
        data.append('upload_preset','cvBuilderApp')
        data.append("cloud_name","dtsivtryd")

        fetch("https://api.cloudinary.com/v1_1/dtsivtryd/image/upload",{
            method:"post",
            body:data           
        }).then(res=>res.json()).
        then(data=>{
            console.log(data)
            setProfilepic(data.url)
            setModal(false)
        })

    }
    return(
        <View style={Styles.Root}>
            <TextInput
                style={Styles.inputStyle}
                theme={theme}
                label="Name"
                mode="outlined"
                value={Name}
                onChangeText={text => setName(text)}
                />
                <TextInput
                style={Styles.inputStyle}
                theme={theme}
                label="Email"
                mode="outlined"
                value={Name}
                onChangeText={text => setEmail(text)}
                />
                <TextInput
                style={Styles.inputStyle}
                theme={theme}
                label="Phone"
                mode="outlined"
                keyboardType="number-pad"
                value={Name}
                onChangeText={text => setPhone(text)}
                />
                <TextInput
                style={Styles.inputStyle}
                theme={theme}
                label="Email"
                mode="outlined"
                value={Name}
                onChangeText={text => setEmail(text)}
                />
                <TextInput
                style={Styles.inputStyle}
                theme={theme}
                label="Salary"
                mode="outlined"
                value={Name}
                onChangeText={text => setSalary(text)}
                />
                <Button style={Styles.inputStyle}
                theme={theme} 
                icon="upload" mode="contained" onPress={() => setModal(true)}>
                    Upload Image
                </Button>
                <Button style={Styles.inputStyle}
                theme={theme} 
                icon="content-save" mode="contained" onPress={() => console.log("saved")}>
                    Save
                </Button>
               <Modal 
                    animationType="slide"
                    transparent={true} 
                    visible={modal} 
                    onRequestClose={()=>{
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
                        <Button  theme={theme} onPress={() => setModal(false)}>Cancel</Button>
                    </View>
               </Modal>
                
        </View>
    )
}

const theme = {
    colors:{
        primary:"#006aff"
    }
}
const Styles=StyleSheet.create({
    root:{
        flex:1
    },
    inputStyle:{
      margin:5
    },
    modalView:{
      position:"absolute",
      bottom:2,
      backgroundColor:"lightgrey",
      width:"100%"
    },
    modalBttnView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
    }
})
export default CreateEmployee