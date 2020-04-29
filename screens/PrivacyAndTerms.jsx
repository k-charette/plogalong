import React, { useCallback } from "react";
import { StyleSheet, Text, View, Button, Linking } from "react-native";

const websiteURL = "https://www.plogalong.com/";
const mainMessage =
  "";
const createdBy =
  "";

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

export default class PrivacyAndTermsScreen extends React.Component {
  static navigationOptions = {
    title: "About Plogalong",
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainMessageContainer}>
          <Text style={styles.mainMessageText}>{mainMessage}</Text>
        </View>
        {/* Lines 33-35 can be changed into a custom component*/}
        <View style={styles.mainMessageContainer}>
          <Text style={styles.mainMessageText}>{createdBy}</Text>
        </View>
        <OpenURLButton url={websiteURL}>Visit our Website</OpenURLButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainMessageContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: "aqua", // change this color
    alignContent: "center",
    alignItems: "center",
  },
  mainMessageText: {
    fontSize: 18,
    padding: 15,
  },
});
