import { View, Text ,StyleSheet, FlatList, Image, Linking, Share} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function ActionButton({business}) {
  
    const actionButtonMenu=[
        {
            id:1,
            name:'Call',
            icon:require('./../../assets/images/call.png'),
            url:'tel:'+business?.contact
        },
        {
            id:2,
            name:'Location',
            icon: require('./../../assets/images/pin.png'),
            url:'https://www.google.com/maps/search/?api=1&query='+business?.address
        },
        {
            id:3,
            name:'Web',
            icon:require('./../../assets/images/web.png'),
            url:business?.Website
        },
        {
            id:4,
            name:'Share',
            icon: require('./../../assets/images/share.png'),
            url:business?.Website
        },
    ]
    
    const onPressHandle=(item)=>{
        if(item.name == 'Share'){
            Share.share({
                message:business?.name+"\n Address:"+business.address+"\n Find more details on Business Directory App "
            })
            return ;
        }
        Linking.openURL(item.url);
    }

  return (
    <View style={styles.container}>
       <FlatList 
        data={actionButtonMenu}
        horizontal={true}
        contentContainerStyle={{width: '100%', justifyContent:'space-between'}}
        renderItem={({item,index})=>(
             <TouchableOpacity key={index}
              onPress={()=>onPressHandle(item)}
             > 
                <Image source={item?.icon} 
                 style={styles.icons}
                />
                <Text style={styles.iconName}>{item.name}</Text>
             </TouchableOpacity>
        )}
       />
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        padding:20,
    },
    icons:{
        height:50,
        width:50,
    },
    iconName:{
       fontFamily:'outfit-medium',
       textAlign:'center',
       marginTop:3,

    },

})