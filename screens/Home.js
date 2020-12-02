import React from 'react';
import { StyleSheet, Text, View, Image,FlatList } from 'react-native';
import {Card,FAB} from 'react-native-paper'

const Home = ({navigation})=> {

    const data=[
        {id:1,name:"Ali",email:"abc@gmail.com",salary:"2lac",phone:"02121821545",position:"web Dev",picture:"https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=521&q=80"},
        {id:2,name:"sara",email:"ghf@gmail.com",salary:"3lac",phone:"02121821545",position:"Android Dev",picture:"https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=521&q=80"},
        {id:3,name:"gogo",email:"fdd@gmail.com",salary:"4lac",phone:"02121821545",position:"java Dev",picture:"https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=521&q=80"},
        {id:4,name:"gul",email:"eee@gmail.com",salary:"5lac",phone:"021 21821545",position:"xml Dev",picture:"https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=521&q=80"},
    ]

    const renderList =((item)=>{
        return( <Card style={styles.mycard} key={item.id}
            onPress={()=>navigation.navigate("Profile",{item})}
        >

            <View style={styles.cardView}>
                <Image 
                    style={{width:60,height:60,borderRadius:50/2}}
                    source={{uri:"https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=521&q=80"}} />
                
                <View style={{marginLeft:10}}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text>{item.position}</Text>
                </View>
            </View>   
        </Card>)
    })
    return(
        <View style={{flex:1}}>
           <FlatList 
            data={data}
            renderItem={({item})=>{
                return renderList(item)
            }}
            keyExtractor={item=>item.id.toString()}

           />
        <FAB onPress={()=>navigation.navigate("Create")}
            style={styles.fab}
            small={false}
            theme={{colors:{accent:"#006aff"}}}
            icon="plus"
           
        />
        </View>
    )
}
const styles = StyleSheet.create({
    mycard:{
        margin:5,
        padding:5
    },
    cardView:{
        flexDirection:"row",
        padding:6
    },
    text:{
        fontSize:18,
    }, fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      }
})

export default Home