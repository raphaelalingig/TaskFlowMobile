import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DueDateDropdown = ({ setSelectedStartDate, setSelectedEndDate }) => {
  const [selected1stDate, setSelected1stDate] = useState(null);
  const [selected2ndDate, setSelected2ndDate] = useState(null);
  const [show1stPicker, setShow1stPicker] = useState(false);
  const [show2ndPicker, setShow2ndPicker] = useState(false);

  const handleFirstDateChange = (event, date) => {
    setShow1stPicker(false); // Hide the picker after selecting a date
    if (date) {
      setSelected1stDate(date);
      const formattedDate = date.toISOString().split("T")[0]; // Format date to "YYYY-MM-DD"
      setSelectedStartDate(formattedDate); // Update start date state in AddProject.js
    }
  };

  const handleSecondDateChange = (event, date) => {
    setShow2ndPicker(false); // Hide the picker after selecting a date
    if (date) {
      setSelected2ndDate(date);
      const formattedDate = date.toISOString().split("T")[0]; // Format date to "YYYY-MM-DD"
      setSelectedEndDate(formattedDate); // Update end date state in AddProject.js
    }
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{ marginRight: 20 }}>
        <TouchableOpacity
          onPress={() => setShow1stPicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.buttonText}>
            {selected1stDate
              ? selected1stDate.toISOString().split("T")[0]
              : "Select start date"}
          </Text>
        </TouchableOpacity>
        {show1stPicker && (
          <DateTimePicker
            value={selected1stDate || new Date()}
            mode="date"
            display="default"
            onChange={handleFirstDateChange}
          />
        )}
      </View>
      <Text>to</Text>
      <View style={{ marginLeft: 20 }}>
        <TouchableOpacity
          onPress={() => setShow2ndPicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.buttonText}>
            {selected2ndDate
              ? selected2ndDate.toISOString().split("T")[0]
              : "Select due date"}
          </Text>
        </TouchableOpacity>
        {show2ndPicker && (
          <DateTimePicker
            value={selected2ndDate || new Date()}
            mode="date"
            display="default"
            onChange={handleSecondDateChange}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dateButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
  },
});

export default DueDateDropdown;
