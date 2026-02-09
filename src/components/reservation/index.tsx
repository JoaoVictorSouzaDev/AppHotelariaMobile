import React, { useEffect, useState, useCallback} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContainer from "../ui/AuthContainer";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const RenderReservation = () => {
  const router = useRouter();
  const [reservations, setReservations] = useState<any[]>([]);

  const loadReservations = async () => {
    try {
      const storedData = await AsyncStorage.getItem('@reservas');
      if (storedData) {
        setReservations(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Erro ao carregar reservas:", error);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadReservations();
    }, [])
  );

  const removeReservation = async (id: string) => {
    try {
      const updatedList = reservations.filter(item => item.id !== id);
      setReservations(updatedList);
      await AsyncStorage.setItem('@reservas', JSON.stringify(updatedList));
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover o item.");
    }
  };

  const totalValue = reservations.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <AuthContainer
      title="Minhas Reservas"
      subtitle="Revise os itens do seu carrinho"
      icon="plane-departure"
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 15 }}>
        <View>
          
          {reservations.length > 0 ? (
            reservations.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.cardHeader}>
                  <FontAwesome5 name="bed" size={20} color="#4b0505" />
                  <View style={{ flex: 1 }}> 
                    <Text style={styles.roomLabel}>{item.label}</Text>
                    <Text style={styles.roomSubtitle}>{item.text.replace('\n', ' • ')}</Text>
                  </View>
                  
                  <TouchableOpacity onPress={() => removeReservation(item.id)}>
                    <MaterialIcons name="delete-outline" size={24} color="#cc0000" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.divider} />

                <View style={styles.infoGrid}>
                  <View style={styles.infoBox}>
                    <Text style={styles.miniLabel}>ENTRADA</Text>
                    <Text style={styles.infoText}>{item.checkIn || "--/--/--"}</Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Text style={styles.miniLabel}>SAÍDA</Text>
                    <Text style={styles.infoText}>{item.checkOut || "--/--/--"}</Text>
                  </View>
                  <View style={styles.infoBox}>
                    <Text style={styles.miniLabel}>HÓSPEDES</Text>
                    <Text style={styles.infoText}>{item.guests} Pessoas</Text>
                  </View>
                </View>

                <View style={{ marginTop: 15, alignItems: 'flex-end' }}>
                  <Text style={{ fontWeight: 'bold', color: '#4b0505' }}>
                    R$ {item.price.toFixed(2)}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={{ padding: 40, alignItems: 'center' }}>
              <MaterialIcons name="shopping-cart" size={50} color="#DDD" />
              <Text style={{ color: '#999', marginTop: 10 }}>Seu carrinho está vazio</Text>
            </View>
          )}

          {reservations.length > 0 && (
            <>
              <View style={styles.priceCard}>
                <Text style={styles.sectionTitle}>Resumo do Valor</Text>
                
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Subtotal ({reservations.length} itens)</Text>
                  <Text style={styles.priceValue}>R$ {totalValue.toFixed(2)}</Text>
                </View>

                <View style={styles.totalDivider} />

                <View style={styles.priceRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalPrice}>R$ {totalValue.toFixed(2)}</Text>
                </View>
              </View>

              <View style={styles.buttonArea}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => console.log("Finalizar", reservations)}
                >
                  <Text style={styles.confirmButtonText}>CONFIRMAR RESERVA</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

        </View>
      </ScrollView>
    </AuthContainer>
  );
};

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#EEE",
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  roomLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#07042b",
    lineHeight: 22,
  },
  roomSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginBottom: 15,
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoBox: {
    alignItems: "flex-start",
  },
  miniLabel: {
    fontSize: 10,
    color: "#999",
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 10,
    color: "#07042b",
  },
  priceCard: {
    marginTop: 10,
    backgroundColor: "#F9FAFB",
    padding: 20,
    borderRadius: 15,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceLabel: { 
    color: "#666" 
  },
  priceValue: { 
    fontWeight: "500" 
  },
  totalDivider: {
    height: 1,
    backgroundColor: "#DDD",
    marginVertical: 10,
  },
  totalLabel: { 
    fontSize: 18, 
    fontWeight: "bold"
  },
  totalPrice: {
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#28A745" 
  },
  buttonArea: {
    marginTop: 30,
  },
  confirmButton: {
    backgroundColor: "#4b0505",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  }
});

export default RenderReservation;