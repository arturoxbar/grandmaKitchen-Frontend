import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

export default StyleSheet.create({
  iconContainer: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
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
  confirmationText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
