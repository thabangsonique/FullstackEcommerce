import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import useSocialAuth from "@/hooks/useSocialAuth";

const AuthScreen = () => {
  const { isLoading, handleSocialAuth } = useSocialAuth();

  return (
    <View className="flex-1 justify-center items-center px-8">
      <Image
        source={require("../../assets/images/auth-image.png")}
        className="size-96"
        resizeMode="contain"
      />

      {/* GOOGLE SIGN-IN BUTTON */}
      <TouchableOpacity
        className="mt-3 px-6 py-3 bg-white rounded-full border
       border-gray-300"
        onPress={() => handleSocialAuth("oauth_google")}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size={"small"} color={"#4285f4"} />
        ) : (
          <View className="flex-row justify-center items-center">
            <Image
              source={require("../../assets/images/Google-icon.png")}
              className="size-8 mr-3"
            />
            <Text>Continue with Google.</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* APPLE SIGN-IN BUTTON */}
      <TouchableOpacity
        className="mt-3 px-7 py-3 bg-white rounded-full border
       border-gray-300"
        onPress={() => handleSocialAuth("oauth_google")}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size={"small"} color={"#4285f4"} />
        ) : (
          <View className="flex-row justify-center items-center">
            <Image
              source={require("../../assets/images/Apple-icon.png")}
              className="size-8 mr-3"
            />
            <Text>Continue with Apple.</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text className="text-center mt-6 text-gray-500">
        By signing up, you agree to our
        <Text className="text-blue-500"> Terms , Privacy Policy</Text>
        {" and "}
        <Text className="text-blue-500">Cookie Use</Text>
      </Text>
    </View>
  );
};

export default AuthScreen;
