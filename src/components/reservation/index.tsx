import React, { useEffect, useState, useCallback } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  Alert, 
  ActivityIndicator 
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContainer from "../ui/AuthContainer";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";

const { width } = Dimensions.get("window");

const RenderReservation = () => {
  const router = useRouter();
  const { createReserve } = useAuth();
  
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [paymentMethod, setPaymentMethod] = useState("Pix");
  const paymentOptions = ['Débito', 'Crédito', 'Dinheiro', 'Pix'];

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

  const handleFinalizeReservation = async () => {
    if (reservations.length === 0) return;

    try {
      setLoading(true);

      const quartosFormatados = reservations.map(item => ({
        id: item.id,
        inicio: item.checkIn,
        fim: item.checkOut
      }));

      await createReserve(paymentMethod, 1, quartosFormatados);

      await AsyncStorage.removeItem('@reservas');
      setReservations([]);

      Alert.alert(
        "Sucesso!", 
        "Seu pedido foi processado com sucesso.",
        [{ text: "OK", onPress: () => router.replace("/(tabs)/explorer") }]
      );

    } catch (error: any) {
      console.error("Erro no envio:", error);
      Alert.alert("Erro na Reserva", "Não foi possível concluir o pedido no servidor.");
    } finally {
      setLoading(false);
    }
  };

  const totalValue = reservations.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);

  return (
    <AuthContainer
      title="Minhas Reservas"
      subtitle="Revise os itens do seu carrinho"
      icon="plane-departure"
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        
        {reservations.length > 0 ? (
          reservations.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.cardHeader}>
                <FontAwesome5 name="bed" size={20} color="#4b0505" />
                <View style={{ flex: 1 }}> 
                  <Text style={styles.roomLabel}>{item.label}</Text>
                  <Text style={styles.roomSubtitle}>{item.text?.replace('\n', ' • ')}</Text>
                </View>
                <TouchableOpacity onPress={() => removeReservation(item.id)} disabled={loading}>
                  <MaterialIcons name="delete-outline" size={24} color="#cc0000" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.divider} />

              <View style={styles.infoGrid}>
                <View style={styles.infoBox}>
                  <Text style={styles.miniLabel}>ENTRADA</Text>
                  <Text style={styles.infoText}>{item.checkIn}</Text>
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.miniLabel}>SAÍDA</Text>
                  <Text style={styles.infoText}>{item.checkOut}</Text>
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.miniLabel}>TOTAL ITEM</Text>
                  <Text style={styles.infoText}>R$ {Number(item.price).toFixed(2)}</Text>
                </View>
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
            <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
            <View style={styles.paymentGrid}>
              {paymentOptions.map((option) => (
                <TouchableOpacity 
                  key={option}
                  style={[
                    styles.paymentOption, 
                    paymentMethod === option && styles.paymentSelected
                  ]}
                  onPress={() => setPaymentMethod(option)}
                  disabled={loading}
                >
                  <Text 
                    numberOfLines={1} 
                    style={[
                      styles.paymentText, 
                      paymentMethod === option && { color: '#FFF' }
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.priceCard}>
              <View style={styles.priceRow}>
                <Text style={styles.totalLabel}>Total Geral</Text>
                <Text style={styles.totalPrice}>R$ {totalValue.toFixed(2)}</Text>
              </View>

              <TouchableOpacity
                style={[styles.confirmButton, loading && { opacity: 0.7 }]}
                onPress={handleFinalizeReservation}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.confirmButtonText}>CONFIRMAR PEDIDO</Text>
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
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
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  roomLabel: { fontSize: 17, fontWeight: "bold", color: "#07042b" },
  roomSubtitle: { fontSize: 12, color: "#666" },
  divider: { height: 1, backgroundColor: "#F0F0F0", marginVertical: 10 },
  infoGrid: { flexDirection: "row", justifyContent: "space-between" },
  infoBox: { alignItems: "flex-start" },
  miniLabel: { fontSize: 9, color: "#999", fontWeight: "bold" },
  infoText: { fontSize: 13, fontWeight: "600", color: "#333" },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginTop: 20, marginBottom: 10, color: "#07042b" },
  paymentGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    gap: 10, 
    marginBottom: 20 
  },
  paymentOption: { 
    width: '48%',
    paddingVertical: 12, 
    borderRadius: 10, 
    borderWidth: 1.5, 
    borderColor: '#4b0505', 
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  paymentSelected: { backgroundColor: '#4b0505' },
  paymentText: { fontWeight: 'bold', color: '#4b0505', fontSize: 14 },
  priceCard: { backgroundColor: "#F9FAFB", padding: 20, borderRadius: 15, marginTop: 10 },
  priceRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  totalLabel: { fontSize: 18, fontWeight: "bold" },
  totalPrice: { fontSize: 20, fontWeight: "bold", color: "#28A745" },
  confirmButton: { 
    backgroundColor: "#4b0505", 
    height: 55, 
    borderRadius: 12, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  confirmButtonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 }
});

export default RenderReservation;