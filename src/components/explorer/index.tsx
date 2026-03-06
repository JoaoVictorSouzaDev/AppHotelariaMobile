import { Text, Dimensions, TouchableOpacity, View, Pressable, ScrollView, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Modal } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputSpin from '../ui/InputSpin';
import DateSelector from '../ui/DateSelector';
import TextField from '../ui/TextField';
import AuthContainer from '../ui/AuthContainer';
import RoomCard from '../ui/RoomCard';
import { global } from '../ui/styles';
import BottomSheet from '../ui/BottomSheet';
import { useAuth } from "@/context/AuthContext";

const { width } = Dimensions.get("window");

const RenderExplorer = () => {
  const { searchRoom } = useAuth();
  
  const [isSearched, setIsSearched] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [qntGuests, setQntGuests] = useState<number>(1);
  const [calendar, setCalendar] = useState<"checkin" | "checkout" | null>(null);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const closeCalendar = () => setCalendar(null);

  const handleOpenReserve = (room: any) => {
    setSelectedRoom(room);
    setIsReserveModalOpen(true);
  };

  const handleSearch = async () => {
    if (!checkIn || !checkOut) {
      Alert.alert("Atenção", "Por favor, selecione as datas de entrada e saída.");
      return;
    }

    setLoading(true);
    setAvailableRooms([]);
    setIsSearched(false);

    try {
      const data = await searchRoom(checkIn, checkOut, qntGuests);
      setAvailableRooms(data || []);
    } catch (error: any) {
      setAvailableRooms([]);
    } finally {
      setLoading(false);
      setIsSearched(true);
    }
  };

  const handleAddToCart = async () => {
    try {
      const storedData = await AsyncStorage.getItem('@reservas');
      const currentReservations = storedData ? JSON.parse(storedData) : [];

      const newReservation = {
        id: selectedRoom.id,
        label: selectedRoom.nome,
        checkIn: checkIn,
        checkOut: checkOut,
        price: selectedRoom.preco,
        text: `Quarto nº ${selectedRoom.numero}\n${qntGuests} Hóspedes`
      };


      const isAlreadyInCart = currentReservations.some((item: any) => item.id === newReservation.id);
      
      if (isAlreadyInCart) {
        Alert.alert("Atenção", "Este quarto já está no seu carrinho.");
        return;
      }

      const updatedReservations = [...currentReservations, newReservation];
      await AsyncStorage.setItem('@reservas', JSON.stringify(updatedReservations));

      setIsReserveModalOpen(false);
      Alert.alert("Sucesso", "Quarto adicionado ao carrinho!");

    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar ao carrinho.");
    }
  };

  return (
    <AuthContainer hasContentStyle={false} icon="hotel" title="Grand Hotel Royal">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: 30 }}>
          
          <View style={global.separator} />

          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
            <TouchableOpacity style={{ width: width * 0.4 }} onPress={() => setCalendar("checkin")}>
              <TextField
                label='Check-In'
                value={checkIn}
                icon={{ lib: "MaterialCommunityIcons", name: "calendar-import" }}
                placeholder="Entrada"
                editable={false}
              />
            </TouchableOpacity>

            <TouchableOpacity style={{ width: width * 0.4 }} onPress={() => setCalendar("checkout")}>
              <TextField
                label='Check-Out'
                value={checkOut}
                icon={{ lib: "MaterialCommunityIcons", name: "calendar-export" }}
                placeholder="Saída"
                editable={false}
              />
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center', marginVertical: 15, marginBottom: 30 }}>
            <Text style={global.label}>Número de hóspedes</Text>
            <InputSpin
              guests={qntGuests}
              onSelectSpin={setQntGuests}
              minGuests={1}
              maxGuests={6}
              step={1}
            />
          </View>

          <TouchableOpacity 
            activeOpacity={0.7}
            disabled={loading}
            style={[styles.searchButton, loading && { opacity: 0.8 }]}
            onPress={handleSearch}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.searchButtonText}>Consultar Disponibilidade</Text>
            )}
          </TouchableOpacity>

          {(!isSearched && !loading) ? (
            <View style={styles.initialContainer}>
              <MaterialCommunityIcons name="calendar-search" size={60} color="#DDD" />
              <Text style={styles.initialTitle}>Encontre sua reserva</Text>
              <Text style={styles.initialSubtitle}>
                Escolha as datas para verificar os quartos disponíveis.
              </Text>
            </View>
          ) : (isSearched && !loading) && (
            <View style={{ marginTop: 10 }}>
              {availableRooms.length > 0 ? (
                <>
                  <Text style={[global.label, { marginBottom: 15, marginLeft: width * 0.07 }]}>
                    Opções encontradas:
                  </Text>
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={width * 0.85 + 20} 
                    decelerationRate="fast"
                    style={{ marginHorizontal: -(width * 0.07), width: width }}
                    contentContainerStyle={{ paddingHorizontal: width * 0.07 }}
                  >
                    {availableRooms.map((room) => (
                      <RoomCard
                        key={room.id}
                        image={room.fotos?.length > 0 ? { uri: room.fotos[0].url } : require("../../../assets/images/ImageHotel.jpeg")}
                        label={room.nome}
                        icon={{ lib: "MaterialCommunityIcons", name: "bed" }}
                        description={{ 
                          text: `${room.qtd_cama_casal} Casal • ${room.qtd_cama_solteiro} Solteiro`, 
                          price: room.preco 
                        }}
                        onPressReserve={() => handleOpenReserve(room)}
                      />
                    ))}
                  </ScrollView>
                </>
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyTitle}>Ops! Tudo lotado.</Text>
                  <Text style={styles.emptySubtitle}>
                    Tente outras datas ou menos hóspedes.
                  </Text>
                </View>
              )}
            </View>
          )}

        </View>
      </ScrollView>

      <Modal transparent animationType='fade' visible={calendar !== null} onRequestClose={closeCalendar}>
        <Pressable style={global.absoluteOverlay} onPress={closeCalendar}>
          <Pressable onPress={() => {}}>
            {calendar === "checkin" && <DateSelector onSelectDate={(d) => {setCheckIn(d); closeCalendar();}} />}
            {calendar === "checkout" && <DateSelector onSelectDate={(d) => {setCheckOut(d); closeCalendar();}} />}
          </Pressable>
        </Pressable>
      </Modal>

      <BottomSheet visible={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)}>
        <View style={{ flex: 1 }}>
          <Text style={styles.modalTitle}>Confirmar Reserva</Text>
          {selectedRoom && (
            <View>
              <View style={styles.roomInfoBox}>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>{selectedRoom.nome}</Text>
                <Text style={{ color: '#666', marginTop: 5 }}>Quarto nº {selectedRoom.numero}</Text>
              </View>
              <View style={{ gap: 12 }}>
                <View style={styles.rowInfo}><Text>Check-in:</Text><Text style={styles.boldText}>{checkIn}</Text></View>
                <View style={styles.rowInfo}><Text>Check-out:</Text><Text style={styles.boldText}>{checkOut}</Text></View>
                <View style={styles.rowInfo}><Text>Hóspedes:</Text><Text style={styles.boldText}>{qntGuests}</Text></View>
              </View>
              <View style={[global.separator, { marginVertical: 20 }]} />
              <View style={styles.rowInfo}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total:</Text>
                <Text style={styles.totalText}>R$ {Number(selectedRoom.preco).toFixed(2)}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={handleAddToCart}
              >
                <Text style={styles.confirmButtonText}>Adicionar ao Carrinho</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </BottomSheet>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  searchButton: {
    backgroundColor: '#4b0505',
    height: 55,
    borderRadius: 12,
    marginHorizontal: width * 0.07,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  initialContainer: {
    marginHorizontal: width * 0.07,
    padding: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  initialTitle: { fontSize: 18, fontWeight: 'bold', color: '#4b0505', marginTop: 15 },
  initialSubtitle: { textAlign: 'center', color: '#999', marginTop: 8 },
  emptyContainer: {
    marginHorizontal: width * 0.07,
    padding: 30,
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    alignItems: 'center',
  },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#4b0505' },
  emptySubtitle: { textAlign: 'center', color: '#666', marginTop: 5 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#4b0505', marginBottom: 20 },
  roomInfoBox: { backgroundColor: '#f8f8f8', padding: 15, borderRadius: 15, marginBottom: 20 },
  rowInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  boldText: { fontWeight: 'bold', fontSize: 16 },
  totalText: { fontSize: 22, fontWeight: 'bold', color: '#28a745' },
  confirmButton: { backgroundColor: '#4b0505', padding: 18, borderRadius: 15, marginTop: 30, alignItems: 'center' },
  confirmButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default RenderExplorer;