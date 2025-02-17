import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    backgroundColor: COLORS.strong_blue,
    borderRadius: 25,
    overflow: "hidden",
    width: "90%",
    paddingBottom: 15,
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  title: {
    color: COLORS.yellow,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  title2: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  iconButton: {
    marginHorizontal: 15,
  },
});
