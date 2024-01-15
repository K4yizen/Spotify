import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";

export default function Genres() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function getGenres() {
      try {
        const response = await fetch("http://192.168.1.16:8888/genres", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setGenres(data);
          console.log("Genres récupérés :", data);
        } else {
          console.error("Erreur lors de la récupération des genres.");
        }
      } catch (err) {
        console.error("Erreur :", err);
      }
    }

    getGenres();
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.leftArea}>
          {genres
            .filter((_, index) => index % 2 === 0)
            .map((genre) => (
              <View
                key={genre.id}
                style={[styles.content, { backgroundColor: genre.categoryColor }]}
              >
                <Pressable>
                  <Text style={styles.text}>{genre.categoryName}</Text>
                </Pressable>
              </View>
            ))}
        </View>
        <View style={styles.rightArea}>
          {genres
            .filter((_, index) => index % 2 === 1)
            .map((genre) => (
              <View
                key={genre.id}
                style={[styles.content, { backgroundColor: genre.categoryColor }]}
              >
                <Pressable>
                  <Text style={styles.text}>{genre.categoryName}</Text>
                </Pressable>
              </View>
            ))}
        </View>
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
    top: 90,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  rightArea: {
    flex: 1,
    marginStart: 5,
    gap: 10,
  },
  leftArea: {
    flex: 1,
    gap: 10,
    marginEnd: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    height: 100,
    borderWidth: 1,
    opacity: 0.8,
    borderRadius: 7,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  text: {
    flex: 3,
    paddingLeft: 10,
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    top: 15,
    color: "white",
  },
  cover: {
    aspectRatio: 1,
  },
});
