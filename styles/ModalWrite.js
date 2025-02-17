import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blurback,
  },
  modalContainer: {
    width: "90%",
    backgroundColor: COLORS.strong_blue,
    borderRadius: 20,
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    flex: 1,
  },
  inputContainer: {
    marginBottom: 15,
  },
  textInput: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.yellow,
    color: COLORS.black,
    backgroundColor: COLORS.paper,
    fontSize: 20,
    padding: 10,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
