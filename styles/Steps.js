import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

export default StyleSheet.create({
  stepsContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: COLORS.strong_blue,
    borderRadius: 20,
  },
  stepsTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS.yellow,
    marginBottom: 10,
    textAlign: "center",
  },
  stepCard: {
    backgroundColor: COLORS.paper,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  stepText: {
    color: COLORS.strong_blue,
    fontSize: 16,
  },
  stepInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  stepInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.yellow,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    color: COLORS.strong_blue,
  },
  addStepButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  addStepButtonText: {
    color: COLORS.yellow,
    marginLeft: 5,
  },
});
