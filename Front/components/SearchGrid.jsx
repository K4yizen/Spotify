import { View, Text, Pressable, StyleSheet, Image } from "react-native";

export default function SearchGrid() {
  return (
    <View style={styles.main}>
      <View style={styles.leftArea}>
        <Pressable style={styles.content}>
          <Text style={styles.text}>Podcasts</Text>
        </Pressable>
        <Pressable style={styles.content}>
          <Text style={styles.text}>Hip-Hop</Text>
        </Pressable>
        <Pressable style={styles.content}>
          <Text style={styles.text}>Beat</Text>
        </Pressable>
      </View>
      <View style={styles.rigthArea}>
        <Pressable style={styles.content}>
          <Text style={styles.text}>Classsements</Text>
        </Pressable>
        <Pressable style={styles.content}>
       
          <Text style={styles.text}>Radio</Text>
        </Pressable>
        <Pressable style={styles.content}>
      
          <Text style={styles.text}>Funk</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    top : 180,
    gap : 5,
  },
  rigthArea: { flex: 1, gap: 5 },
  leftArea: { flex: 1, gap: 5, marginLeft: 20 },
  content: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    backgroundColor: "#404040",
    opacity: 0.8,
    borderRadius: 7,
    justifyContent: "space-between",
    overflow : "hidden"
  },

  text: {
    flex: 3, // Occupe 75% de l'espace
    paddingLeft: 10,
    textAlign: "left",
    color: "white",
  },

  cover: {
    flex: 1.3, // Occupe 25% de l'espace
    aspectRatio: "2/2",
  },
});
