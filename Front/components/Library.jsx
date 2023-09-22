import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import SVGComponent from "../assets/svgPinIcon.jsx";

const Library = () => {
  return (
    <View style={styles.mainDiv}>
      <View style={styles.libraryPlaylist}>
        <View style={styles.libraryCoverAndTitle}>
          <Image
            style={styles.libraryCover}
            source={require("../assets/like.png")}
          />
          <Text style={styles.libraryText}>Titre Likés</Text>
        </View>

        <View style={styles.pinIconAndText}>
          <Text>
            <SVGComponent style={styles.svgPinIcon} />
          </Text>
          <Text style={{color : "lightgrey"}}>Playlist  ⦁ kaiyzenn</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  test: { color: "white" },
  libraryCover: {width : 70, aspectRatio: 1 / 1,},
  mainDiv: { flex: 1 },
  svgPinIcon: {paddingTop : 20}, 
  libraryText: { fontWeight : "bold" ,color: "white", alignItems : "center", top : 20, marginLeft : 10 },
  pinIconAndText : {flexDirection : "row", gap : 5, top : 120, marginLeft : 80},
  libraryCoverAndTitle: {flexDirection : "row", top : 150},
});

export default Library;
