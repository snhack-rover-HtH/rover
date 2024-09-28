import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Notifications from "./Components/Notifications";

export default function Component() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // START OF LOCATION SUGGESTIONS
  // Suggestions state
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  // Fetch suggestions from the JSON file when the component mounts
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch('/suggestions.json');
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSuggestions(data); // Assuming the JSON file contains an array of suggestions
        console.log("Available Suggestions:", data);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // Log input value
    console.log("Input Value:", value);

    if (value) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);

      // Log filtered suggestions
      console.log("Filtered Suggestions:", filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);

    // Log the selected suggestion
    console.log("Selected Suggestion:", suggestion);
  };
  // END OF LOCATION SUGGESTIONS

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        inputValue={inputValue}
        setInputValue={setInputValue}
        filteredSuggestions={filteredSuggestions}
        handleInputChange={handleInputChange}
        handleSuggestionClick={handleSuggestionClick}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Notifications/> 
      </main>

    </div>
  );
}
