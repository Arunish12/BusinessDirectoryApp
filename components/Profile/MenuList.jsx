import { View, Text, FlatList,Image,StyleSheet, Share } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function MenuList() {
   
    const {signOut}=useAuth();
    
    const MenuList = [
        {
            id:1,
            name:'Add Business',
            icon:require('./../../assets/images/add.png'),
            path:'/bussiness/add-business',
        },
        {
            id:2,
            name:'My Business',
            icon:require('./../../assets/images/business-and-trade.png'),
            path:'/bussiness/my-business',
        },
        {
            id:3,
            name:'Share App',
            icon:require('./../../assets/images/share_1.png'),
            path:'share',
        },
        {
            id:4,
            name:'Logout',
            icon:require('./../../assets/images/logout.png'),
            path:'logout',
        },
    ]

    const router = useRouter();
    
    const onMenuclick=(item)=>{
      if(item.path=='logout')
      { 
        signOut();
        return ;
      }
      if(item.path=='share')
      {
        Share.share(
          {
            message:'Download the Business Directory App'
          }  
          )
          return ;
      }
      router.push(item.path)
    };

    return (
    <View style={styles.container}>
       <FlatList 
        data={MenuList}
        numColumns={2}
        renderItem={({item,index})=>(
              <TouchableOpacity 
              onPress={()=>onMenuclick(item)}
              style={styles.subcontainer}>
                 <Image source={item.icon} 
                   style={styles.Imagestyle}
                 />
                 <Text style={styles.LabelText}>{item.name}</Text>
              </TouchableOpacity>
        )}
       />
       <Text style={{
        fontFamily:'outfit-medium',
        color:Colors.GRAY,
        fontSize:15,
        textAlign:'center',
        marginTop:50,
       }}>Developed By Arunish</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      marginTop:50,
    },
    subcontainer:{
      display:'flex',    
      flexDirection:'row',
      alignItems:'center',
      gap:10,
      flex:1,
      padding:10,
      borderWidth:1,
      borderRadius:15,
      margin:10,
      backgroundColor:'#fff',
      borderColor:Colors.PRIMARY,
    },
    Imagestyle:{
      height:50,
      width:50, 
    },
    LabelText:{
      fontFamily:'outfit-medium',
      fontSize:16,
      flex:1,
    },
    
})