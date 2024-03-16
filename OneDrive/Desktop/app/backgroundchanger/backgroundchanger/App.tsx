import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'


export default function App() {

 const [randombackground , setrandombackground] = useState("#ffffff")

 const generatecolor =()=>{
  const hexrange = '0123456789ABCDEF'
  let color = "#"
  for(let index =0; index <6; index++)
  {
    color = color + hexrange[Math.floor(Math.random()*16)]
  }
  setrandombackground(color)

 }





  return (
    <>
    <StatusBar backgroundColor={randombackground}></StatusBar>
     <View style ={[styles.container, {backgroundColor: randombackground}]}>
      <TouchableOpacity onPress={generatecolor}>
        <View style ={[styles.actionbutton ]}>
          <Text style = {[styles.actionbuttonText]}>Press Me</Text>
        </View>
      </TouchableOpacity>
    </View>
    </>
   
  )
}

const styles = StyleSheet.create({
container:{
  flex:1,
  alignItems:'center',
  justifyContent:'center'
},
actionbutton: {
  borderRadius: 12,
  backgroundColor:'#6A1B4D',
  paddingHorizontal: 14,
  paddingVertical:10
},
actionbuttonText:{
fontSize:23,
color: '#FFFFFF',
textTransform: 'uppercase'
}
})