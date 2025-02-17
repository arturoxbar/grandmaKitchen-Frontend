import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blurback,
  },
  modalContainer: {
    width: "70%",
    backgroundColor: COLORS.strong_blue,
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
  },
  closeButtonContainer: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  textInput: {
    height: 48,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.yellow,
    color: COLORS.black,
    width: "80%",
    backgroundColor: COLORS.white,
    marginVertical: 10,
    fontSize: 16,
    paddingHorizontal: 10,
  },
});
