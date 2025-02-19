import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import COLORS from "../constants/colors";

const StepsSection = ({ steps, onChangeSteps }) => {
  const [stepInput, setStepInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Agregar un nuevo paso usando el callback del padre
  const addStep = () => {
    if (stepInput.trim().length > 0) {
      onChangeSteps([...steps, stepInput.trim()]);
      setStepInput("");
      setShowInput(false);
    }
  };

  // Eliminar un paso
  const removeStep = (indexToRemove) => {
    onChangeSteps(steps.filter((_, index) => index !== indexToRemove));
  };

  // Iniciar edición de un paso
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(steps[index]);
  };

  // Guardar edición
  const saveEditing = () => {
    const newSteps = [...steps];
    newSteps[editingIndex] = editingText.trim();
    onChangeSteps(newSteps);
    setEditingIndex(null);
    setEditingText("");
  };

  // Cancelar edición
  const cancelEditing = () => {
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <View style={styles.stepsContainer}>
      <Text style={styles.stepsTitle}>Steps</Text>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepCard}>
          {editingIndex === index ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.editInput}
                value={editingText}
                onChangeText={setEditingText}
                placeholder="Edit step..."
                placeholderTextColor={COLORS.gray}
                backgroundColor={COLORS.yellow}
              />
              <TouchableOpacity onPress={saveEditing} style={styles.saveButton}>
                <Icon name="save" size={20} color={COLORS.strong_blue} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={cancelEditing}
                style={styles.cancelButton}
              >
                <Icon name="close" size={20} color={COLORS.strong_blue} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.stepDisplay}>
              <Text style={styles.stepText}>
                {index + 1}. {step}
              </Text>
              <TouchableOpacity
                onPress={() => startEditing(index)}
                style={styles.editButton}
              >
                <Icon name="pencil" size={20} color={COLORS.strong_blue} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeStep(index)}
                style={styles.deleteButton}
              >
                <Icon name="trash-o" size={20} color={COLORS.strong_blue} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
      {showInput ? (
        <View style={styles.stepInputContainer}>
          <TextInput
            style={styles.stepInput}
            placeholder="Enter step..."
            placeholderTextColor={COLORS.gray}
            value={stepInput}
            onChangeText={setStepInput}
            backgroundColor={COLORS.paper}
          />
          <TouchableOpacity onPress={addStep} style={styles.addStepButton}>
            <Text style={styles.addStepButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setShowInput(true)}
          style={styles.addStepButton}
        >
          <Icon name="plus" size={25} color={COLORS.yellow} />
          <Text style={styles.addStepButtonText}>Add Step</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    flexDirection: "row",
    alignItems: "center",
  },
  stepDisplay: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepText: {
    color: COLORS.strong_blue,
    fontSize: 16,
    flex: 1,
  },
  editButton: {
    paddingHorizontal: 5,
    marginLeft: 10,
  },
  deleteButton: {
    paddingHorizontal: 5,
    marginLeft: 10,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.yellow,
    borderRadius: 10,
    padding: 5,
    color: COLORS.strong_blue,
  },
  saveButton: {
    paddingHorizontal: 5,
    marginLeft: 5,
  },
  cancelButton: {
    paddingHorizontal: 5,
    marginLeft: 5,
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

export default StepsSection;
