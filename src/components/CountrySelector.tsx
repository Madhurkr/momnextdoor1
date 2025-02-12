import React from "react";
import { Platform, View, StyleSheet } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import CountryFlag from "react-native-country-flag";
import { Picker } from "@react-native-picker/picker";

interface CountrySelectorProps {
  country: string;
  setCountry: (country: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ country, setCountry }) => {
  if (Platform.OS === "web") {
    return (
      <View style={styles.dropdownContainer}>
        <Picker selectedValue={country} onValueChange={(value) => setCountry(value)} style={styles.picker}>
          <Picker.Item label="🇺🇸 United States" value="US" />
          <Picker.Item label="🇨🇦 Canada" value="CA" />
          <Picker.Item label="🇬🇧 United Kingdom" value="GB" />
          <Picker.Item label="🇮🇳 India" value="IN" />
          <Picker.Item label="🇦🇺 Australia" value="AU" />
        </Picker>
      </View>
    );
  }

  return (
    <View style={styles.pickerContainer}>
      <CountryPicker
        countryCode={country}
        withFilter
        withFlag
        withCountryNameButton
        onSelect={(selectedCountry) => setCountry(selectedCountry.cca2)}
      />
      <CountryFlag isoCode={country} size={25} />
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: 200,
  },
});

export default CountrySelector;
