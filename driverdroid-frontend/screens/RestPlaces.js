import React from 'react';  
import { StyleSheet, View } from 'react-native'; 
import MapView from 'react-native-maps';  
import { Marker } from 'react-native-maps';  
  
const RestPlaces = ({navigation}) => {
  return (  
    <View style = {styles.MainContainer}>  
      <MapView  
        style = {styles.mapStyle}  
        showsUserLocation = {true}  
        zoomEnabled = {true}  
        zoomControlEnabled = {true}  
        initialRegion = {{  
          latitude : 6.914750831444174,   
          longitude : 79.8457825645276,  
          latitudeDelta : 0.0922,  
          longitudeDelta : 0.0421,  
        }}
      > 
    
      
      <Marker  
        coordinate = {{ latitude: 6.865346058401994, longitude: 79.85985049711343 }}  
        title={"IIT Sri Lanka"}  
        description={"Informatics Institute of Technology"}  
      />
      
    </MapView>  
          
  </View>  
    );  
   
}

  
const styles = StyleSheet.create({  
  MainContainer: {  
    position: 'absolute',  
    top: 0,  
    left: 0,  
    right: 0,  
    bottom: 0,  
    alignItems: 'center',  
    justifyContent: 'flex-end',  
  },  
  mapStyle: {  
    position: 'absolute',  
    top: 0,  
    left: 0,  
    right: 0,  
    bottom: 0,  
  }, 
  

});

export default RestPlaces;