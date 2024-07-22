import {
  Container,
  HStack,
  Select,
  Textarea,
  VStack,
  Button,
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

 
  const handleToggle = () => setIsToggled(!isToggled);

  useEffect(() => {
    
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
    // Create a new style element to dynamically load the font
    const fontFace = new FontFace(selectedFontFamily, `url(${fontURL})`);
    fontFace.load().then((loadedFace) => {
      document.fonts.add(loadedFace);
    });
  }, [fontURL, selectedFontFamily]);

  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <VStack width={"100%"}>
              <HStack
                width={"100%"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <HStack m={"3"} flex={"1"}>
                  <label>Font Family</label>
                  <Select
                    maxW={28}
                    m="2"
                    borderRadius="lg"
                    px="1"
                    py="1"
                    bg="gray.100"
                    cursor="pointer"
                    _focus={{ outline: "none" }}
                    border="1px"
                    value={selectedFontFamily}
                    borderColor="black"
                    onChange={(e) => setSelectedFontFamily(e.target.value)}
                  >
                    {Object.keys(fonts).map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </HStack>

                <HStack m={"5"} flex={"1"}>
                  <label>Variant</label>
                  <Select
                    maxW={28}
                    m="2"
                    borderRadius="lg"
                    px="1"
                    py="1"
                    bg="gray.100"
                    cursor="pointer"
                    _focus={{ outline: "none" }}
                    border="1px"
                    borderColor="black"
                    value={vars}
                    onChange={(e) => setVars(e.target.value)}
                  >
                    {varient.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </HStack>

                <Button
                  onClick={handleToggle}
                  colorScheme={isToggled ? "green" : "red"} 
                  variant={isToggled ? "solid" : "outline"} 
                >
                  {isToggled ? "Italic-On" : "Italic-Off"}
                </Button>
              </HStack>

              <Textarea
                placeholder="Text Editor"
                borderRadius={"md"}
                size={"md"}
                variant={"outline"}
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{
                  fontStyle: isToggled ? "italic" : "normal",
                  fontFamily: selectedFontFamily,
                }}
              ></Textarea>

              <HStack
                width={"100%"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Button
                  maxW={28}
                  width={"auto"}
                  flex={"1"}
                  m="2"
                  borderRadius="lg"
                  px="1"
                  py="1"
                  bg="gray.100"
                  cursor="pointer"
                  _focus={{ outline: "none" }}
                  border="1px"
                  borderColor="black"
                  onClick={() => setText("")}
                >
                  Reset
                </Button>

                <Button
                  maxW={28}
                  width={"auto"}
                  flex={"1"}
                  m="2"
                  borderRadius="lg"
                  px="1"
                  py="1"
                  bg="gray.100"
                  cursor="pointer"
                  _focus={{ outline: "none" }}
                  border="1px"
                  borderColor="black"
                >
                  Save
                </Button>
              </HStack>
            </VStack>
          </>
        )}
      </Container>
    </>
  );
}

export default App;
