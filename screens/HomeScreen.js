import { StyleSheet, Text, View,SafeAreaView,Alert, Pressable,Image,TextInput,ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location"
import { set } from "date-fns";
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";
import { useSelector } from "react-redux";
const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart)
  console.log(cart);
    const [displayCurrentAddress, setdisplayCurrentAddress] = useState("we are loading your location");
    const [locationServicesEnabled,setlocationServicesEnabled] = useState(false);
    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
    },[]);
    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if(!enabled) {
            Alert.alert(
                'Location services not enabled',
                'Please enanble the location services',
                [
                  {
                    text: 'Cancel',
                    onPress: () => Alert.alert('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text:"OK",onPress: () => console.log("OK Pressed")}
                ],
                {cancelable: true,onDismiss: () =>  Alert.alert( 'This alert was dismissed by tapping outside of the alert dialog.', ),},
              );
            }else{
                setlocationServicesEnabled(enabled)
            }  
    }     
    const getCurrentLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();

        if(status !== "granted"){
            Alert.alert(
                'Permission denied',
                'allow the app to use the location services',
                [
                  {
                    text: 'Cancel',
                    onPress: () => Alert.alert('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text:"OK",onPress: () => console.log("OK Pressed")}
                ],
                {cancelable: true,onDismiss: () =>  Alert.alert( 'This alert was dismissed by tapping outside of the alert dialog.', ),},
              );
        };

        const {coords} = await Location.getCurrentPositionAsync();
        // console.log(coords)
        if(coords){
            const {latitude,longitude} = coords;
            
            let respone = await Location.reverseGeocodeAsync({
              latitude,
              longitude
            });

            // console.log(respone)

            const handleResponse = (response) => {
              if (response && Array.isArray(response)) {
                // Kiểm tra xem response có tồn tại và có dữ liệu không
                for (let item of response) {
                  let address = `${item.name} ${item.city} ${item.postalCode}`;
                  setDisplayCurrentAddress(address);
                }
              } else {
                console.error('Response không tồn tại hoặc không phải là một mảng.');
              }
            };
        }
    };   
    
   
   
    const services = [
      {
        id: "0",
        image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
        name: "shirt",
        quantity: 0,
        price: 10,
      },
      {
        id: "11",
        image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
        name: "T-shirt",
        quantity: 0,
        price: 10,
      },
      {
        id: "12",
        image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
        name: "dresses",
        quantity: 0,
        price: 10,
      },
      {
        id: "13",
        image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
        name: "jeans",
        quantity: 0,
        price: 10,
      },
      {
        id: "14",
        image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
        name: "Sweater",
        quantity: 0,
        price: 10,
      },
      {
        id: "15",
        image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
        name: "shorts",
        quantity: 0,
        price: 10,
      },
      {
        id: "16",
        image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
        name: "Sleeveless",
        quantity: 0,
        price: 10,
      },
    ];
    return (
        <ScrollView style={{backgroundColor:"#F0F0F0",flex:1,marginTop:50}}>
          {/*Location and Profile*/}
          <View style={{flexDirection:"row", alignItems:"center",padding:10}}>
          <MaterialIcons name="location-on" size={30} color="#fd5c63" />
          <View>
            <Text style={{fontSize:18, fontWeight:"600"}}>Home</Text>
          <Text>(displayCurrentAddress)</Text>
          </View>
           <Pressable style={{marginLeft:150}}>
              <Image style={{width:40, height:40, borderRadius:20}} source={{url:"https://lh3.googleusercontent.com/ogw/ANLem4YRMI6wlfw6jslpbEW_k444RF32ttsD1-zJ0VwV-g=s32-c-mo"}}/>
           </Pressable>
          </View>

          {/*Search bar*/}
          <View style={{padding:10,margin:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between",borderWidth:0.8, borderColor:"#C0C0C0",borderRadius:7}}>
            <TextInput placeholder="Search for items or More"/>
            <Feather name="search" size={24} color="#fd5c63" />
          </View>

          {/* Image Carousel*/}
            <Carousel/>  

          {/* Services Component*/}
        <Services/>

          {/* Render all the Products*/}
          {services.map((item,index) => (
          <DressItem item={item} key={index} />
        ))}
          </ScrollView>
    );

};
export default HomeScreen
const appStyles = StyleSheet.create({})