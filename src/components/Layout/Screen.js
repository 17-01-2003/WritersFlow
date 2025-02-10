import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
import { COLOURS } from "../../UI/colour";

const Screen = ({ children, scrollable = false }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      {scrollable ? (
        <ScrollView contentContainerStyle={styles.screen}>
          {children}
        </ScrollView>
      ) : (
        <View style={styles.screen}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOURS.white,
  },
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLOURS.white,
  },
});

export default Screen;
