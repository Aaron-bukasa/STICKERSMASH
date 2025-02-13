import { View, Text, StyleSheet } from "react-native"
import { Image, type ImageSource } from "expo-image"

type Props = {
    imgSource: ImageSource
}

export function ImageViewer({ imgSource }: Props) {
    return (
        <Image source={imgSource} style={styles.image} />
    )
}

const styles = StyleSheet.create({
    image: {
        width: 340,
        height: 440,
        borderRadius: 18,
    }
})