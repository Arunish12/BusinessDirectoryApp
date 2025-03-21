import { View, Text, Image,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from './../constants/Colors';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

   const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])
   

  return (
    <View>
        <View style={styles.container}>
         <Image source={require('./../assets/images/login.png')} 
          style = {styles.LoginImage}
         />
        </View>

        <View style={styles.subcontainer}>
            <Text style={styles.HeadingText}> Your Ultimate
               <Text style={{
                 color:Colors.PRIMARY
               }}>  Community Business Directory </Text> 
               App
            </Text>
            <Text style={styles.LabelText}>Find Your Favorite business near your and post your own business to your Community</Text>
           
           <TouchableOpacity style={styles.btn}
             onPress={onPress}
           >
              <Text style={styles.BtnText}>Let's Get Started</Text>
           </TouchableOpacity>

        </View>
    </View>
  )
}

const  styles = StyleSheet.create({
    container:{
        display:'flex',
        alignItems:'center',
        marginTop: 100,
    },
    LoginImage: {
         width:220,
         height: 450,
         borderRadius: 20,
         borderWidth: 6,
         borderColor: '#000',
    },
    subcontainer:{
         backgroundColor: '#fff',
         padding: 20,
         marginTop:-20,
    },
    HeadingText: {
        fontSize: 30,
        fontFamily: 'outfit-bold',
        textAlign:'center'
    },
    LabelText:{
        fontSize: 15,
        fontFamily:'outfit',
        textAlign:'center',
        color: Colors.GRAY
    },
    btn:{
        backgroundColor:Colors.PRIMARY,
        padding:16,
        borderRadius: 99,
        marginTop: 20
    },
    BtnText:{
        textAlign:'center',
        color:'#fff',

    }
})

