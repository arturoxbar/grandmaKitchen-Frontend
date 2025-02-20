import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

export default StyleSheet.create({
  container: { backgroundColor: COLORS.strong_blue, flex: 1 },
  background: { justifyContent: "center", flex: 1 },
  center: { alignItems: "center" },
  title: {
    color: COLORS.yellow,
    fontSize: 60,
    fontWeight: "bold",
    marginTop: 120,
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: COLORS.paper,
    height: "90%",
    width: "100%",
    paddingTop: 10,
    alignItems: "center",
  },
  avatar: { height: 160, width: 160, marginVertical: 10 },
  input: {
    height: 48,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.strong_blue,
    color: COLORS.yellow,
    width: "80%",
    backgroundColor: COLORS.grayish_white,
    marginVertical: 10,
  },
  saveButton: { alignItems: "center", borderRadius: 20, marginBottom: 50 },
  saveText: { color: COLORS.strong_blue, fontWeight: "bold", fontSize: 16 },
  buttonContainer: { width: "70%", marginVertical: 5 },
});
