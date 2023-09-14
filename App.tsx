import Home from './components/Home';
import Search from './components/Search';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme} from '@react-navigation/native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'; 
import { SearchBar } from 'react-native-screens';
import Library from './components/Library';




const Tab = createBottomTabNavigator();


export default function App() {
  
  return (
   <NavigationContainer theme={DarkTheme}>
    <Tab.Navigator screenOptions={{}} >
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon : () => (<Ionicons name="home-outline" size={24} color="white" />),
        header: () =>
        (
          <View style={{ height: 125, flexDirection: "row", top : 60, justifyContent: "space-between", marginRight: 20,}}>
            <Text style={{fontSize : 23, fontWeight: "bold", marginLeft: 20, color:"white"}}>Bonjour</Text>
            <View style={{flexDirection : "row", gap: 20}}>
            <Feather name="bell" size={30} color="white" />
            <Ionicons name="md-settings-outline" size={30} color="white" />
            </View>
          </View>
        ),
      }} />
      {/* <Tab.Screen name="Écouter" component={Nav} options={{
        tabBarIcon : () => (<Feather name="music" size={24} color="black" />)
      }} /> */}
        <Tab.Screen name="Search" component={Search} options={{
        tabBarIcon : () => (<MaterialIcons name="search" size={24} color="white" /> ),
        header: () =>
        (
          <View style={{ height: 25, flexDirection: "row", top : 60, justifyContent: "space-between", marginRight: 20}}>
            <Text style={{fontSize : 23, fontWeight: "bold", marginLeft: 20, color:"white"}}>Rechercher</Text>
            <View style={{flexDirection : "row", gap: 20}}>
            <Ionicons name="ios-camera-outline" size={24} color="white" />
            </View>
          </View>
        ),
      }} />
        <Tab.Screen name="Librairie" component={Library} options={{
        tabBarIcon : () => (<MaterialIcons name="my-library-music" size={24} color="white" />
        )
        
      }} />
    </Tab.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
