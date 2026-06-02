import React from "react";
import { useAuth, useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";

//CREATE HOOK FOR USER TO LOGIN.

function useSocialAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const { startSSOFlow } = useSSO();

  async function handleSocialAuth(strategy: "oauth_google" | "oauth_apple") {
    setIsLoading(true);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });

      if (createdSessionId && setActive) {
        //set the active function to activate the session.
        await setActive({ session: createdSessionId }); //tells the app and clerk that user signed in successfully.
      }
    } catch (error) {
      console.log("Error in social auth:", error);
      //grab which provider gave us the error.
      const provider = strategy === "oauth_google" ? "Google" : "Apple";

      Alert.alert(
        "Error",
        `Failed to sign in with ${provider}. Please try again Later`,
      );
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, handleSocialAuth };
}
export default useSocialAuth;
