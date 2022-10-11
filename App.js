import { StatusBar } from "expo-status-bar";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        setContacts(data);
      }
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listContainer}
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <Text style={styles.textName}>{item.name}</Text>
            {item.phoneNumbers !== undefined &&
              item.phoneNumbers.map((num) => (
                <Text style={styles.textNumber} key={num.id}>
                  {num.number}
                </Text>
              ))}
          </View>
        )}
      />
      <Button title="GET CONTACTS" onPress={getContacts}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 70,
    marginBottom: 10,
  },
  list: {
    alignItems: "center",
    marginBottom: 10,
  },
  textName: {
    fontSize: 16,
    marginBottom: 2,
  },
  textNumber: {
    fontSize: 12,
  },
});
