import { View, Text, FlatList } from "react-native";
import products from "../../assets/products.json";

export default function HomeScreen() {
  return (
    <FlatList data={products} renderItem={({ item }) => <productListItem />} />
  );
}
