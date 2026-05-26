import { Text } from "react-native";

export default function productListItem({ product }) {
  return <Text style={{ fontSize: 30 }}>{product.name}</Text>;
}
