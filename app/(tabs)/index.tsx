import { View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker"
import { useState, useRef } from "react";
import { type ImageSource } from 'expo-image';
import * as MediaLibrary from 'expo-media-library';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from 'react-native-view-shot';

import { ImageViewer } from "@/components/ImageViewer";
import Button from "@/components/Bouton";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from '@/components/EmojiList';
import EmojiSticker from "@/components/EmojiSticker";

const PlaceholderImage = require('@/assets/images/background-image.png')

export default function Index() {

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
    } else {
      alert('Vous n\'avez selectionné aucune photo.')
    }
  }

  const onReset = () => {
    setShowAppOptions(false)
  }

  const onAddSticker = () => {
    setIsVisible(true)
  };

  const onModalClose = () => {
    setIsVisible(false)
  }

  if (status === null) {
    requestPermission();
  }

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert('Saved!');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <GestureHandlerRootView
      style={styles.container}
    >
      <View style={styles.imageContainer} >
        <View ref={imageRef} collapsable={false} >
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
      </View>
      </View>
      {showAppOptions ?
        (
          <View style={styles.optionsContainer}>
            <View style={styles.optionRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
            </View>
          </View>
        ) :
        (
          <View style={styles.footerContainer}>
            <Button label="Choisir une image" theme="primary" onPress={pickImageAsync} />
            <Button label="Utiliser cette photo" onPress={() => setShowAppOptions(true)} />
          </View>
        )
      }
      <EmojiPicker isVisible={isVisible} onClose={onModalClose} >
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
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
  },
  optionsContainer: {
   paddingBottom: 80,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
})
