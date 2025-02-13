import { View, StyleSheet } from "react-native";
import { ImageViewer } from "@/components/ImageViewer";
import { Button } from "@/components/Bouton";

const PlaceholderImage = require('@/assets/images/background-image.png')

export default function Index() {

  return (
    <View
      style={styles.container}
    >
      <View style={styles.imageContainer} >
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Choisir une image" theme="primary" />
        <Button label="Utiliser cette photo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignContent: "center",
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
    justifyContent: "flex-end",
  }
})
