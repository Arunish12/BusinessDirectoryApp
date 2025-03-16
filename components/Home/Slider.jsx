import { View, Text, StyleSheet, FlatList, Image} from 'react-native'
import React, { useEffect, useState } from 'react';
import { collection, query } from 'firebase/firestore';
import { db } from './../../Config/FirebaseConfig';
import { getDocs } from 'firebase/firestore';

export default function Slider() {
    
    const [sliderList, setSliderList] = useState([]);

    useEffect(()=>{
        GetSliderList();
    },[])

    const GetSliderList=async()=>{
        setSliderList([]);
        const q=query(collection(db,'Slider'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setSliderList(prev=>[...prev,doc.data()]);
        })
    }
 
    return (
    <View>
      <Text style={styles.LabelText}>#Special For You</Text>
      <FlatList 
        data={sliderList}
        horizontal={true}
        style={{paddingLeft: 20}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
           <Image source={{uri:item.imageUrl}} 
            style={styles.imageStyle}/>  
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    LabelText:{
        fontFamily:'outfit-bold',
        fontSize:20, 
        paddingLeft:20,
        paddingTop: 20,
        marginBottom:5,
    },
    imageStyle:{
        width:300,
        height:150,
        borderRadius: 15,
        marginRight: 15,
    }
})