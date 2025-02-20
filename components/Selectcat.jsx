import React, { useState, useEffect, useCallback } from "react";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../constants/colors";
import { AxiosInstance, categoryEndpoints } from "../config/axios.js";

const Seletcat = ({ selectedCategory, setCategory }) => {
  const [selected, setSelected] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSelect = useCallback(
    (val) => {
      setSelected(val);
      setCategory(val);
    },
    [setCategory]
  );

  useEffect(() => {
    if (setCategory && selectedCategory) {
      setSelected(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await AxiosInstance.get(
            `${categoryEndpoints.baseUrl}/user`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          //console.log("Fetched categories:", response.data.categories);
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  const categoryData = categories.map((category) => ({
    key: category._id,
    value: category.name,
  }));

  return (
    <MultipleSelectList
      placeholder={loading ? "Loading..." : "Categories"}
      boxStyles={{
        backgroundColor: COLORS.paper,
        borderColor: COLORS.yellow,
        borderWidth: 2,
      }}
      dropdownStyles={{ backgroundColor: COLORS.paper }}
      dropdownItemStyles={{
        backgroundColor: COLORS.paper,
        borderColor: COLORS.secundary,
      }}
      dropdownTextStyles={{ backgroundColor: COLORS.paper }}
      setSelected={handleSelect}
      data={categoryData}
      save="value"
      label="Categories"
      notFoundText="No categories found"
      badgeStyles={{ backgroundColor: COLORS.strong_blue }}
      disabled={loading}
    />
  );
};

export default Seletcat;
