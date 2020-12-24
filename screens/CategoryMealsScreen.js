import React from "react";
import { View, Text, StyleSheet, FlatList, Platform } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import Colors from "../constants/Colors";
import MealItem from "../components/MealItem";

const CategoryMeals = (props) => {
  const catId = props.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  const displayMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  const renderMealItem = (itemData) => {
    return (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: "MealDetail",
            params: {
              mealId: itemData.item.id,
            },
          });
        }}
      ></MealItem>
    );
  };
  return (
    <View style={styles.screen}>
      <FlatList
        style={{ width: "100%" }}
        data={displayMeals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
      ></FlatList>
    </View>
  );
};

CategoryMeals.navigationOptions = (navData) => {
  //console.log(navData);
  const catId = navData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
    //  headerStyle: {
    //  backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
    //  },
    // headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMeals;
