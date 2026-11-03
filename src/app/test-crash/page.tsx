export default function TestCrashPage() {
  // Throw an unhandled server error to trigger the global error boundary
  throw new Error("CRITICAL_D1_TIMEOUT: Node AP-SOUTH-1 connection severed.");
}