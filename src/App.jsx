import {
  Container,
  HStack,
  Select,
  Textarea,
  VStack,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import fonts from "./fontFamily";

function App() {
  const [loading, setLoading] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [text, setText] = useState("");
  const [vars, setVars] = useState("400");
  const [varient, setVarient] = useState(["400", "italic400"]);
  const [selectedFontFamily, setSelectedFontFamily] = useState("ABeeZee");
  const [fontURL, setFontURL] = useState(fonts["ABeeZee"]["400"]);

  // Function to toggle the state
  const handleToggle = () => setIsToggled(!isToggled);

  useEffect(() => {
    // Retrieve saved values from local storage
    const savedFontFamily = localStorage.getItem("selectedFontFamily");
    const savedVars = localStorage.getItem("vars");
    const savedText = localStorage.getItem("text");
    const savedIsToggled = localStorage.getItem("isToggled");

    if (savedFontFamily) {
      setSelectedFontFamily(savedFontFamily);
      setVarient(Object.keys(fonts[savedFontFamily]));
    }

    if (savedVars) {
      setVars(savedVars);
      setFontURL(fonts[savedFontFamily][savedVars]);
    }

    if (savedText) {
      setText(savedText);
    }

    if (savedIsToggled) {
      setIsToggled(JSON.parse(savedIsToggled));
    }
  }, []);

  useEffect(() => {
    //  the selected font family
    if (fonts[selectedFontFamily]) {
      setVarient(Object.keys(fonts[selectedFontFamily]));
      setVars("400");
      setFontURL(fonts[selectedFontFamily]["400"]);
    }
  }, [selectedFontFamily]);

  useEffect(() => {
    // Set the font URL
    if (fonts[selectedFontFamily] && fonts[selectedFontFamily][vars]) {
      setFontURL(fonts[selectedFontFamily][vars]);
    }
  }, [selectedFontFamily, vars]);

  useEffect(() => {
    const fontFace = new FontFace(selectedFontFamily, `url(${fontURL})`);
    fontFace.load().then((loadedFace) => {
      document.fonts.add(loadedFace);
    });
  }, [fontURL, selectedFontFamily]);

  const handleSave = () => {
    localStorage.setItem("selectedFontFamily", selectedFontFamily);
    localStorage.setItem("vars", vars);
    localStorage.setItem("text", text);
    localStorage.setItem("isToggled", isToggled);
  };

  const handleReset = () => {
    localStorage.removeItem("selectedFontFamily");
    localStorage.removeItem("vars");
    localStorage.removeItem("text");
    localStorage.removeItem("isToggled");
    setSelectedFontFamily("ABeeZee");
    setVars("400");
    setVarient(["400", "italic400"]);
    setText("");
    setIsToggled(false);
    setFontURL(fonts["ABeeZee"]["400"]);
  };

  return (
    <Container maxW="container.xl" p={4} centerContent>
     
        <VStack spacing={8} width="100%">
          <Box width="100%" p={4} boxShadow="md" borderRadius="md" bg="gray.50">
            <HStack spacing={4} justifyContent="space-between">
              <VStack align="start">
                <Text fontWeight="bold">Font Family</Text>
                <Select
                  maxW={40}
                  value={selectedFontFamily}
                  onChange={(e) => setSelectedFontFamily(e.target.value)}
                  borderColor="gray.300"
                >
                  {Object.keys(fonts).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </VStack>
              <VStack align="start">
                <Text fontWeight="bold">Variant</Text>
                <Select
                  maxW={40}
                  value={vars}
                  onChange={(e) => setVars(e.target.value)}
                  borderColor="gray.300"
                >
                  {varient.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </VStack>
              <Button
                onClick={handleToggle}
                colorScheme={isToggled ? "green" : "red"}
                variant={isToggled ? "solid" : "outline"}
              >
                {isToggled ? "Italic-On" : "Italic-Off"}
              </Button>
            </HStack>
          </Box>
          <Box width="100%" p={4} boxShadow="md" borderRadius="md" bg="white">
            <Textarea
              placeholder="Text Editor"
              borderRadius="md"
              size="md"
              variant="outline"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                fontStyle: isToggled ? "italic" : "normal",
                fontFamily: selectedFontFamily,
              }}
            />
          </Box>
          <HStack spacing={4}>
            <Button
              maxW={40}
              onClick={handleReset}
              colorScheme="gray"
              variant="outline"
            >
              Reset
            </Button>
            <Button
              maxW={40}
              onClick={handleSave}
              colorScheme="blue"
              variant="solid"
            >
              Save
            </Button>
          </HStack>
        </VStack>
      
    </Container>
  );
}

export default App;
