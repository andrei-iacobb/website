import { cookies } from "next/headers"
import SplashScreen from "@/components/splash-screen"
import HomeView from "@/components/home-view"
import DeviceAuth from "@/components/device-auth"

export default async function HomePage() {
  const cookieStore = await cookies()
  const deviceToken = cookieStore.get("trusted-device")
  const isAuthenticated = cookieStore.get("device-authenticated")

  // Check if device is trusted and authenticated
  const isTrustedDevice = deviceToken?.value && isAuthenticated?.value === "true"

  if (isTrustedDevice) {
    return <HomeView />
  } else if (deviceToken?.value) {
    // Device is recognized but needs authentication
    return <DeviceAuth isRecognized={true} />
  } else {
    // Unknown device - show splash screen
    return <SplashScreen />
  }
}
