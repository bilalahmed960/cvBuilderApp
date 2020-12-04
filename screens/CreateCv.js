import React,{useState} from 'react';
import { StyleSheet,Text, View,Modal,Alert,KeyboardAvoidingView} from 'react-native';
import {TextInput,Button} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'

const CreateEmployee = ({navigation,route})=>{
const getDetails = (type)=>{
       if(route.params){
          switch(type){
              case "name":
                  return route.params.name
              case "phone":
                 return route.params.phone
              case "email":
                return route.params.email
              case "salary":
                  return route.params.salary  
              case "picture":
                  return  route.params.picture
              case "position":
                return  route.params.position  
          }
       }
       return ""
    }
    const [name,setName] = useState(getDetails("name"))
    const [phone,setPhone] = useState(getDetails("phone"))
    const [email,setEmail] = useState(getDetails("email"))
    const [salary,setSalary] = useState(getDetails("salary"))
    const [picture,setPicture] = useState(getDetails("picture"))
    const [position,setPosition] = useState(getDetails("position"))
    const [modal,setModal] = useState(false)
    const [enableshift,setenableShift] = useState(false)
  
    const submitData = ()=>{
        fetch("http://03b71ffd087e.ngrok.io/send-data",{
            method:"post",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            Alert.alert(`${data.name} is saved successfuly`)
            navigation.navigate("Home")
        }).catch(err=>{
            Alert.alert("something went wrong")
        })
  }
  const updateDetails = ()=>{
    fetch("http://03b71ffd087e.ngrok.io/update",{
        method:"post",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            id:route.params._id,
            name,
            email,
            phone,
            salary,
            picture,
            position
        })
    })
    .then(res=>res.json())
    .then(data=>{
        Alert.alert(`${data.name} is updated successfuly`)
        navigation.navigate("Home")
    })
    .catch(err=>{
      Alert.alert("someting went wrong")
  })
}
    
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
            setPicture(data.url)
            setModal(false)
        }).catch(err=>{
            Alert.alert("Error while uploading")
        })
    }
    return( 
        <View style={Styles.Root}>
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
                <Button style={Styles.inputStyle}
                theme={theme} 
                icon="upload" mode="contained" onPress={() => setModal(true)}>
                    Upload Image
                </Button>
                {route.params?
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