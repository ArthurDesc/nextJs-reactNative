import React, { useState } from "react";
import { View, Alert, StyleSheet, TouchableOpacity, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native";

function RegisterForm({ onBack }: { onBack: () => void }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://192.168.1.148:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        Alert.alert("Succès", "Inscription réussie !");
        onBack();
      } else {
        Alert.alert("Erreur", data.message || "Erreur lors de l'inscription");
      }
    } catch (e) {
      Alert.alert("Erreur", "Impossible de contacter le serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Inscription</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.text}>{loading ? "En cours..." : "S'inscrire"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBack} style={{ marginTop: 16 }}>
        <Text style={{ color: '#888' }}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const [showRegister, setShowRegister] = useState(false);
  return (
    <View style={styles.container}>
      {showRegister ? (
        <RegisterForm onBack={() => setShowRegister(false)} />
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowRegister(true)}
          >
            <Text style={styles.text}>Inscription</Text>
          </TouchableOpacity>
        </>
      )}
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
  },
  button: {
    padding: 16,
    backgroundColor: "#fee2e2",
    borderRadius: 8,
    alignItems: "center",
    margin: 16,
  },
  text: {
    color: "#b91c1c",
    fontWeight: "bold",
    fontSize: 18,
  },
  formContainer: {
    width: 300,
    backgroundColor: '#f9fafb',
    padding: 24,
    borderRadius: 12,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#b91c1c',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
});
