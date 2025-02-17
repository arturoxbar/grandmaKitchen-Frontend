import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.strong_blue,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: 5,
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  content: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 25,
    resizeMode: "cover",
  },
  titleInput: {
    borderRadius: 20,
    borderBottomWidth: 2,
    borderColor: COLORS.yellow,
    color: COLORS.yellow,
    fontSize: 40,
    marginVertical: 10,
    textAlign: "center",
  },
  sectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.yellow,
    borderRadius: 20,
    backgroundColor: COLORS.yellow,
    marginVertical: 10,
    padding: 10,
  },
  sectionTextContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS.strong_blue,
  },
  sectionIcon: {
    paddingHorizontal: 11,
  },
});
