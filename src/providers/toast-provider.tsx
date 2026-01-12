import * as React from "react"
import { SimpleToastProvider } from "../components/SimpleToast"

// This is now just a wrapper for SimpleToastProvider
export function ToastProvider({ children }: { children: React.ReactNode }) {
  return <SimpleToastProvider>{children}</SimpleToastProvider>;
}

// If you want to use the simple toast directly
export { useSimpleToast } from "../components/SimpleToast";