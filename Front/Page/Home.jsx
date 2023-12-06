import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import GridView from "../components/GridHomePage";

export default function Home() {
  return (
    <ScrollView style={styles.scrollHome}>
      <View style={styles.main}>
        <GridView style={styles.grid} />

        {/* First category */}

        <View style={styles.firstCategory}>
          <Text style={styles.firstTitle}>Pour vous</Text>

          <ScrollView style={styles.scrollCover} horizontal={true}>
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
          </ScrollView>
        </View>

        {/* Second Category  */}

        <View style={styles.secondCategory}>
          <Text style={styles.firstTitle}>Discover Picks For You</Text>

          <ScrollView style={styles.scrollCover} horizontal={true}>
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
          </ScrollView>
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
  main: { paddingBottom: 2000 },
  firstCategory: { top: 40 },
  firstTitle: {
    fontWeight: "bold",
    fontSize: 23,
    marginLeft: 20,
    color: "white",
  },
  musiqueCover: { width: 150, height: 150, left: 20, top: 15 },
  container: { flex: 1, flexDirection: "row", gap: 12, paddingBottom: 15 },

  secondCategory: { top: 90 },
  scrollHome: { height: "100%", top: 15 },

  thirdCategory: { top: 140 },
  artistsCover: {
    width: 150,
    height: 150,
    left: 20,
    top: 15,
    borderRadius: 75,
  },
});
