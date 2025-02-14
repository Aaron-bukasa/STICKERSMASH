import { View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker"
import { useState } from "react";

import { ImageViewer } from "@/components/ImageViewer";
import { Button } from "@/components/Bouton";

const PlaceholderImage = require('@/assets/images/background-image.png')

export default function Index() {

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const pickImageAsync = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    })

    if(!result.canceled) {
      setSelectedImage(result.assets[0].uri)      
    } else {
      alert('Vous n\'avez selectionné aucune photo.')
    }
  }

  return (
    <View
      style={styles.container}
    >
      <View style={styles.imageContainer} >
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Choisir une image" theme="primary" onPress={pickImageAsync} />
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
