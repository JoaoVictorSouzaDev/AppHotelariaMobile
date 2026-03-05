import { Text, Dimensions, TouchableOpacity, View, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useState } from 'react';
import { Modal } from 'react-native';
import InputSpin from '../ui/InputSpin';
import DateSelector from '../ui/DateSelector';
import TextField from '../ui/TextField';
import AuthContainer from '../ui/AuthContainer';
import RoomCard from '../ui/RoomCard';
import { global } from '../ui/styles';
import BottomSheet from '../ui/BottomSheet';
import { useAuth } from "@/context/AuthContext";

const RenderExplorer = () => {
  const { searchRoom } = useAuth();
  const { width } = Dimensions.get("window");
  
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
      if (!error.message.includes("encontrado")) {
        Alert.alert("Erro", "Ocorreu um problema ao buscar quartos.");
      }
      setAvailableRooms([]);
    } finally {
      setLoading(false);
      setIsSearched(true);
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
            style={{
              backgroundColor: '#4b0505',
              paddingVertical: 15,
              borderRadius: 12,
              marginHorizontal: width * 0.07,
              marginBottom: 30,
              alignItems: 'center',
              opacity: loading ? 0.6 : 1
            }}
            onPress={handleSearch}
          >
            {loading ? <ActivityIndicator color="#fff" /> : (
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                Consultar Disponibilidade
              </Text>
            )}
          </TouchableOpacity>

          {loading ? (
            <View style={{ marginTop: 30 }}>
              <ActivityIndicator size="large" color="#4b0505" />
              <Text style={{ textAlign: 'center', marginTop: 10, color: '#666' }}>Buscando quartos...</Text>
            </View>
          ) : isSearched && (
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
                <View style={{ 
                  marginHorizontal: width * 0.07, 
                  padding: 30, 
                  backgroundColor: '#f2f2f2', 
                  borderRadius: 15, 
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#ddd',
                  borderStyle: 'dashed'
                }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#4b0505' }}>
                    Ops! Tudo lotado.
                  </Text>
                  <Text style={{ textAlign: 'center', color: '#666', marginTop: 5 }}>
                    Não há quartos disponíveis para estas datas ou número de pessoas.
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
        {/* ... conteúdo do BottomSheet igual ao anterior ... */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4b0505', marginBottom: 20 }}>
            Confirmar Reserva
          </Text>
          {selectedRoom && (
            <View>
              <View style={{ backgroundColor: '#f8f8f8', padding: 15, borderRadius: 15, marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>{selectedRoom.nome}</Text>
                <Text style={{ color: '#666', marginTop: 5 }}>Quarto nº {selectedRoom.numero}</Text>
              </View>
              <View style={{ gap: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 16 }}>Check-in:</Text>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{checkIn}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 16 }}>Check-out:</Text>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{checkOut}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 16 }}>Hóspedes:</Text>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{qntGuests}</Text>
                </View>
              </View>
              <View style={[global.separator, { marginVertical: 20 }]} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total:</Text>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#28a745' }}>
                  R$ {Number(selectedRoom.preco).toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity 
                style={{ backgroundColor: '#4b0505', padding: 18, borderRadius: 15, marginTop: 30, alignItems: 'center' }}
                onPress={() => setIsReserveModalOpen(false)}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Confirmar Pedido</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </BottomSheet>
    </AuthContainer>
  );
}

export default RenderExplorer;