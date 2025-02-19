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

const IngredientsSection = ({ ingredients, onChangeIngredients }) => {
  const [ingredientInput, setIngredientInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Agregar un ingrediente
  const addIngredient = () => {
    if (ingredientInput.trim().length > 0) {
      onChangeIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput("");
      setShowInput(false);
    }
  };

  // Eliminar un ingrediente
  const removeIngredient = (indexToRemove) => {
    onChangeIngredients(
      ingredients.filter((_, index) => index !== indexToRemove)
    );
  };

  // Iniciar la edición de un ingrediente
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(ingredients[index]);
  };

  // Guardar edición
  const saveEditing = () => {
    const newIngredients = [...ingredients];
    newIngredients[editingIndex] = editingText.trim();
    onChangeIngredients(newIngredients);
    setEditingIndex(null);
    setEditingText("");
  };

  // Cancelar edición
  const cancelEditing = () => {
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <View style={styles.ingredientsContainer}>
      <Text style={styles.ingredientsTitle}>Ingredients</Text>
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientCard}>
          {editingIndex === index ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.editInput}
                value={editingText}
                onChangeText={setEditingText}
                placeholder="Edit ingredient..."
                placeholderTextColor={COLORS.gray}
                backgroundColor={COLORS.paper}
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
            <View style={styles.ingredientDisplay}>
              <Text style={styles.ingredientText}>
                {index + 1}. {ingredient}
              </Text>
              <TouchableOpacity
                onPress={() => startEditing(index)}
                style={styles.editButton}
              >
                <Icon name="pencil" size={20} color={COLORS.strong_blue} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeIngredient(index)}
                style={styles.deleteButton}
              >
                <Icon name="trash-o" size={20} color={COLORS.strong_blue} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
      {showInput ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter ingredient..."
            placeholderTextColor={COLORS.gray}
            value={ingredientInput}
            onChangeText={setIngredientInput}
            backgroundColor={COLORS.paper}
          />
          <TouchableOpacity onPress={addIngredient} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setShowInput(true)}
          style={styles.addButton}
        >
          <Icon name="plus" size={25} color={COLORS.yellow} />
          <Text style={styles.addButtonText}>Add Ingredient</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ingredientsContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: COLORS.strong_blue,
    borderRadius: 20,
  },
  ingredientsTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS.yellow,
    marginBottom: 10,
    textAlign: "center",
  },
  ingredientCard: {
    backgroundColor: COLORS.paper,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  ingredientDisplay: {
    flexDirection: "row",
    alignItems: "center",
  },
  ingredientText: {
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.yellow,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    color: COLORS.strong_blue,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  addButtonText: {
    color: COLORS.yellow,
    marginLeft: 5,
  },
});

export default IngredientsSection;
