import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import GridView from "./GridHomePage";

export default function Home() {
  return (
  
      <ScrollView style={styles.scrollView}>
      <View style={styles.main}>
        {/* Top home button  */}


        <Image
          style={styles.avatar}
          source={{ uri: "https://www.w3schools.com/howto/img_avatar.png" }}
        />

        <View style={styles.buttonArea}>
          <Pressable style={styles.buttonMusique}>
            <Text style={{ color: "white" }}>Musique</Text>
          </Pressable>
          <Pressable style={styles.buttonPodcast}>
            <Text style={{ color: "white" }}>Podcast & émissions</Text>
          </Pressable>
        </View>

        <GridView style={styles.grid} />

        {/* First category */}

        <View style={styles.firstCategory}>
          <Text style={styles.firstTitle}>Pour vous</Text>

          <View style={styles.container}>
            <Image
              style={styles.musiqueCover}
              source={require("../assets/umla.jpeg")}
            />

            <Image
              style={styles.musiqueCover}
              source={require("../assets/umla.jpeg")}
            />

            <Image
              style={styles.musiqueCover}
              source={require("../assets/umla.jpeg")}
            />
          </View>
        </View>

        {/* Second Category  */}

        <View style={styles.secondCategory}>
          <Text style={styles.firstTitle}>Discover Picks For You</Text>

          <View style={styles.container}>
            <Image
              style={styles.musiqueCover}
              source={require("../assets/umla.jpeg")}
            />

            <Image
              style={styles.musiqueCover}
              source={require("../assets/umla.jpeg")}
            />

            <Image
              style={styles.musiqueCover}
              source={require("../assets/umla.jpeg")}
            />
          </View>
        </View>

        {/* Third Category  */}

        <View style={styles.thirdCategory}>
          <Text style={styles.firstTitle}>Favorite Artists</Text>

          <View style={styles.container}>
            <Image
              style={styles.artistsCover}
              source={require("../assets/umla.jpeg")}
            />

            <Image
              style={styles.artistsCover}
              source={require("../assets/umla.jpeg")}
            />

            <Image
              style={styles.artistsCover}
              source={require("../assets/umla.jpeg")}
            />
          </View>
        </View>

        {/* First view end  */}
    </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  main : { paddingBottom : 2000},
  buttonMusique: {
    width: 100,
    height: 30,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#404040",
    marginLeft: "3%",
  },
  buttonPodcast: {
    width: 150,
    height: 30,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#404040",
  },
  buttonArea: { flexDirection: "row", gap: 8, },
  firstCategory: { top: 40 },
  firstTitle: {
    fontWeight: "bold",
    fontSize: 23,
    marginLeft: 20,
    color: "white",
  },
  musiqueCover: { width: 150, height: 150, left: 20, top: 15 },
  container: { flex: 1, flexDirection: "row", gap: 12 },

  secondCategory: { top : 90},
  scrollView : {height : "100%",},

  thirdCategory : { top : 140},
  artistsCover : { width: 150, height: 150, left: 20, top: 15  ,borderRadius : 75}
});
