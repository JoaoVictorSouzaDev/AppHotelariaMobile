import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
 
const { width } = Dimensions.get("window");
 
const RenderReservation = () => {
  const router = useRouter();
 
  // Aqui recebe os dados da Explore via params futuramente
  const { checkIn, checkOut, guests } = useLocalSearchParams();
 
  return (
    <AuthContainer
      title="Minhas Reservas"
      subtitle="Revise os itens do seu carrinho"
      icon="plane-departure"
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={global.content}>
 
          <View style={styles.itemCard}>
            <View style={styles.cardHeader}>
              <FontAwesome5 name="bed" size={20} color="#07042b" />
              <Text style={styles.roomLabel}>Quarto Master</Text>
            </View>
           
            <View style={styles.divider} />
 
            <View style={styles.infoGrid}>
              <View style={styles.infoBox}>
                <Text style={styles.miniLabel}>ENTRADA</Text>
                <Text style={styles.infoText}>{checkIn || "10/10/2026"}</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.miniLabel}>SAÍDA</Text>
                <Text style={styles.infoText}>{checkOut || "15/10/2026"}</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.miniLabel}>HÓSPEDES</Text>
                <Text style={styles.infoText}>{guests || "2"} Pessoas</Text>
              </View>
            </View>
          </View>
 
          {/* Resumo de Valores */}
          <View style={styles.priceCard}>
            <Text style={styles.sectionTitle}>Resumo do Valor</Text>
           
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Diárias (5 noites)</Text>
              <Text style={styles.priceValue}>R$ 904,50</Text>
            </View>
           
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Taxas de serviço</Text>
              <Text style={styles.priceValue}>R$ 45,00</Text>
            </View>
 
            <View style={styles.totalDivider} />
 
            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalPrice}>R$ 949,50</Text>
            </View>
          </View>
 
          {/* Botões de Ação */}
          <View style={styles.buttonArea}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => console.log("Finalizar")}
            >
              <Text style={styles.confirmButtonText}>CONFIRMAR RESERVA</Text>
            </TouchableOpacity>
 
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => router.back()}
            >
              <Text style={styles.cancelButtonText}>ALTERAR DATAS</Text>
            </TouchableOpacity>
          </View>
 
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
    marginBottom: 25,
    elevation: 2,
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
    marginTop: 20,
    backgroundColor: "#F9FAFB",
    padding: 20,
    borderRadius: 15,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  priceLabel: { color: "#666" },
  priceValue: { fontWeight: "500" },
  totalDivider: {
    height: 1,
    backgroundColor: "#DDD",
    marginVertical: 10,
  },
  totalLabel: { fontSize: 18, fontWeight: "bold" },
  totalPrice: { fontSize: 18, fontWeight: "bold", color: "#28A745" },
  buttonArea: {
    marginTop: 30,
    gap: 12,
  },
  confirmButton: {
    backgroundColor: "rgba(7, 4, 43, 0.94)", // Cor do InputSpin
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(7, 4, 43, 0.94)",
  },
  cancelButtonText: {
    color: "rgba(7, 4, 43, 0.94)",
    fontWeight: "bold",
  },
});
 
export default RenderReservation;