import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { currOptions } from "./Options";
import { SelectList } from "react-native-dropdown-select-list";
import Header from "./components/Header";

export default function App() {
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [rate, setRate] = useState();

  useEffect(() => {
    axios.get(`https://v6.exchangerate-api.com/v6/7775cc050e86656f28e93692/pair/${fromCur}/${toCur}`)
   .then(res => setRate(res.data.conversion_rate))
   .catch(err => {
       alert("API is not responding", err.code);
   })
}, [fromCur, toCur]);

  return (
    <>
      <Header title='Currency Converter' />
      <View
        style={{
          alignItems: "center",
          paddingTop: 10,
        }}
      >
          <Text style={{ fontSize: 24 }}>Convert from:</Text>
          <SelectList
            setSelected={(val) => setFromCur(val)}
            data={currOptions}
            save="key"
            defaultOption={{ key: "USD", value: "United States Dollars" }}
            boxStyles={{ width: 300 }}
          />
          <View style={{marginBottom: 35}}></View>
          <Text style={{ fontSize: 24, marginTop: 20 }}>Convert to:</Text>
          <SelectList
            setSelected={(val) => setToCur(val)}
            data={currOptions}
            save="key"
            defaultOption={{ key: "EUR", value: "Euros" }}
            boxStyles={{ width: 300 }}
          />
      </View>
      <View
        style={{
          alignItems: "center",
          flex: 1,
        }}
      >
        <View style={{ alignItems: "center", flex: 2, marginBottom: "25%", marginTop: "30%"}}>
          <Text style={{ fontSize: 30}}>1 {fromCur}</Text>
          <Text style={{ fontSize: 30}}>=</Text>
          <Text style={{ fontSize: 30}}>{rate} {toCur}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    height: "15%",
    backgroundColor: "lavender",
    alignItems: "center",
    justifyContent: "center",
  },
});
