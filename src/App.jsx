import { ChakraProvider } from "@chakra-ui/react";
import ContactMeSection from "./components/ContactMeSection";
import { AlertProvider } from "./context/alertContext";
import Alert from "./components/Alert";

function App() {
  return (
    <ChakraProvider>
      <AlertProvider>
        <main>  
          <ContactMeSection />
          <Alert />
        </main>
      </AlertProvider>
    </ChakraProvider>
  );
}

export default App;
