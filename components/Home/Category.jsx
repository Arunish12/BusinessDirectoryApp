import { View, Text,StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from './../../constants/Colors';
import { query ,collection, getDocs} from 'firebase/firestore';
import { db } from './../../Config/FirebaseConfig';
import CategoryItem from './../../components/Home/CategoryItem';
import { useRouter } from 'expo-router';


export default function Category({explore = false,onCategorySelect}) {
    
    const [categoryList,setCategoryList] = useState([]);
    const router = useRouter();
    useEffect(()=>{
        GetCategoryList();
    },[])

    const GetCategoryList=async () =>{
        setCategoryList([]);
        const q = query(collection(db,'Category'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setCategoryList(prev=>[...prev,doc.data()]) 
        })
    }

    const onCategoryPressHandler=(item)=>{
        
        if(!explore){
            router.push('/businessList/'+item.name)
        }
        else{
            onCategorySelect(item.name);
        }
    }

  return (
    <View>
        {!explore &&<View style={styles.container}>
            <Text style={styles.CategoryText}>Category</Text>
            <Text style={{color:Colors.PRIMARY,fontFamily:'outfit-medium'}}>View All</Text>
        </View> }
        
        <FlatList 
            data={categoryList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginLeft : 20}}
            renderItem={({item,index})=>(
              <CategoryItem 
              category={item} 
              key={index} 
              onCategoryPress={(category)=>
                onCategoryPressHandler(item)}
              />
            )}
        />    
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
         padding:20,
         display:'flex',
         flexDirection:'row',
         justifyContent:'space-between',
         marginTop:10,
    },
    CategoryText:{
       fontFamily:'outfit-bold',
       fontSize:20, 
    },
    

})