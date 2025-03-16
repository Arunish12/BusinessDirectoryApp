import { View, Text,StyleSheet, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { db, storage } from './../../Config/FirebaseConfig';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';
import { ActivityIndicator } from 'react-native';


export default function AddBusiness() {
  const navigation = useNavigation();
  const [image,setImage] = useState(null);
  const [categoryList, SetcategoryList] = useState([]);
  const {user} = useUser();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();
  const [website, setWebsite] = useState();
  const [about, setAbout] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
        headerTitle: 'Add New Business',
        headerShown: true,
    });
    GetCategoryList();
}, []);

  const onImagePick=async()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      setImage(result?.assets[0].uri);
      console.log(result);
  }
  
  const GetCategoryList=async()=>{
    SetcategoryList([]);
    const q = query(collection(db,'Category'));
    const snapShot=await getDocs(q);

    snapShot.forEach((doc)=>{
      console.log(doc.data());
      SetcategoryList(prev=>[...prev,{
        label:(doc.data()).name,
        value:(doc.data()).name  
      }])
    })
  }
  
  const onAddNewBusiness =async()=>{
      setLoading(true);
      const fileName=Date.now.toString()+".jpg";
      const resp= await fetch(image);
      const blob= await resp.blob();

      const imageRef=ref(storage,'business-app/'+fileName);

      uploadBytes(imageRef,blob).then((snapShot)=>{
          console.log("File Uploaded....")
      }).then(resp=>{
        getDownloadURL(imageRef).then(async(downloadUrl)=>{
          console.log(downloadUrl);
          saveBusinessDetail(downloadUrl)
        })
      })
      setLoading(false);
  }

  const saveBusinessDetail=async(imageUrl)=>{
    await setDoc(doc(db,'BusinessList',Date.now().toString()),{
      name:name,
      address:address,
      contact:contact,
      about:about,
      website:website,
      category:category,
      username:user?.fullName,
      userEmail:user?.primaryEmailAddress?.emailAddress,
      userImage:user?.imageUrl,
      imageUrl:imageUrl

    })
      setLoading(false);
      ToastAndroid.show('New business added...',ToastAndroid.LONG)
  }

  return (
    <View style={styles.container}>
        <Text style={styles.subHeaderText}>Add New Business</Text>
        <Text style={styles.LabelText}>fill all details in order to add new business</Text>
      
        <TouchableOpacity style={{marginTop: 20}}
        onPress={()=>onImagePick()}
        >
        {!image? <Image source={require('./../../assets/images/placeholder.png')} 
          style={styles.imagedetail}
        />:
        <Image source={{uri:image}} 
          style={styles.imagedetail} 
        />
        }     
        </TouchableOpacity>

      <View>
        <TextInput placeholder='Name' 
         onChangeText={(v) => setName(v)}
         style={styles.placeholder}
       />
       <TextInput placeholder='Address' 
       onChangeText={(v) => setAddress(v)}
         style={styles.placeholder}
       />
        <TextInput placeholder='Contact' 
        onChangeText={(v) => setContact(v)}
         style={styles.placeholder}
        />
        <TextInput placeholder='Website' 
        onChangeText={(v) => setWebsite(v)}
         style={styles.placeholder}
       />
       <TextInput placeholder='About'
       onChangeText={(v) => setAbout(v)}
         multiline
         numberOfLines={5} 
         style={styles.AboutPlaceHolder}
       />
       
        <View style={styles.SelectBUsiness}>
        <RNPickerSelect
          onValueChange={(value) => setCategory(value)}
          items={categoryList}
        />
        </View>
      </View>
       
       <TouchableOpacity 
        disabled = {loading}
        style={styles.SubmitButton}
        onPress={()=>onAddNewBusiness()}
       >
        {loading?
          <ActivityIndicator size={'large'} color={'#fff'} />:
         <Text style={styles.SubmitText}>Add New Business</Text> 
        }
       </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    container:{ 
     padding:20,
    },
    subHeaderText:{
     fontFamily:'outfit-bold',
     fontSize:25,

    },
    LabelText:{
     fontFamily:'outfit',
     color:Colors.GRAY,

    },
    imagedetail:{
     height:100,
     width:100,
     borderRadius:15,

    },
    placeholder:{
     padding:10,
     borderWidth:1,
     borderRadius:5,
     fontSize:17,
     backgroundColor:'#fff',
     marginTop:10,
     borderColor:Colors.PRIMARY,
     fontFamily:'outfit',
    },
    AboutPlaceHolder:{
      padding:10,
      borderWidth:1,
      borderRadius:5,
      fontSize:17,
      backgroundColor:'#fff',
      marginTop:10,
      borderColor:Colors.PRIMARY,
      fontFamily:'outfit',
      height:100,
     },
    SelectBUsiness: {
      borderWidth:1,
      borderRadius:5,
      backgroundColor:'#fff',
      marginTop:10,
      borderColor: Colors.PRIMARY,
     },
    SubmitButton:{
      padding: 15,
      backgroundColor:Colors.PRIMARY,
      borderRadius:5, 
      marginTop: 20,
     },
    SubmitText:{ 
      textAlign:'center',
      fontFamily:'outfit-medium',     
      color:'#fff',

     }
})