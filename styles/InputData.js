import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    fontSize: 16,
    color: COLORS.black,
  },
});

Inputdata.propTypes = {
  maxCharacters: PropTypes.number,
  placeholder: PropTypes.string,
  setText: PropTypes.func.isRequired,
};

Inputdata.defaultProps = {
  maxCharacters: 250,
  placeholder: "Enter text...",
};
