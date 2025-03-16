import { View, Text, Image,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function CategoryItem({category,onCategoryPress}) {
  return (
    <TouchableOpacity onPress={()=>onCategoryPress(category)}>
        <View style={styles.subcontainer}>
                <Image source={{uri:category.icon}} 
                style={{width:40,
                    height: 40,
                }}
                />
        </View>
        <Text style={styles.categoryname}>{category.name}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    subcontainer:{
        padding:15,
        backgroundColor: Colors.ICON_BG,
        borderRadius: 99,
        marginRight: 15,
    },
    categoryname:{
      fontSize: 12,
      fontFamily:'outfit-medium',
      textAlign:'center',
      marginTop:5,

    },
    

})