import { Text, Dimensions, TouchableOpacity, View, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';
import { Modal } from 'react-native';
import InputSpin from '../ui/InputSpin';
import DateSelector from '../ui/DateSelector';
import TextField from '../ui/TextField';
import AuthContainer from '../ui/AuthContainer';
import RoomCard from '../ui/RoomCard';
import { global } from '../ui/styles';
import BottomSheet from '../ui/BottomSheet';

const RenderExplorer = () => {
  const { width } = Dimensions.get("window");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [qntGuests, setQntGuests] = useState<number>(1);
  const [calendar, setCalendar] = useState<"checkin" | "checkout" | null>(null);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const closeCalendar = () => setCalendar(null);

  const handleOpenReserve = (room: any) => {
    setSelectedRoom(room);
    setIsReserveModalOpen(true);
  };

  const rooms = [
    { id: 1, label: 'Quarto Casal Premium', price: 180.99, text: "1 Cama de casal\nAr condicionado" },
    { id: 2, label: 'Suíte Família', price: 350.00, text: "2 Camas de casal\nVista para o mar" },
    { id: 3, label: 'Quarto Solteiro Luxo', price: 120.00, text: "1 Cama de solteiro\nFrigobar incluso" },
  ];

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
          <Text style={[global.label, { marginBottom: 15, marginLeft: width * 0.07 }]}>
            Opções disponíveis:
          </Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            snapToInterval={width * 0.85 + 20} 
            decelerationRate="fast"
            style={{ 
              marginHorizontal: -(width * 0.07), 
              width: width, 
            }}
            contentContainerStyle={{ 
              paddingHorizontal: width * 0.07 
            }}
          >
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                image={require("../../../assets/images/ImageHotel.jpeg")}
                label={room.label}
                icon={{ lib: "MaterialCommunityIcons", name: "bed" }}
                description={{ text: room.text, price: room.price }}
                onPressReserve={() => handleOpenReserve(room)}
              />
            ))}
          </ScrollView>
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

      <BottomSheet 
        visible={isReserveModalOpen} 
        onClose={() => setIsReserveModalOpen(false)}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4b0505', marginBottom: 20 }}>
            Confirmar Reserva
          </Text>
          
          {selectedRoom && (
            <View>
              <View style={{ backgroundColor: '#f8f8f8', padding: 15, borderRadius: 15, marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>{selectedRoom.label}</Text>
                <Text style={{ color: '#666', marginTop: 5 }}>{selectedRoom.text.replace('\n', ' • ')}</Text>
              </View>

              <View style={{ gap: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 16 }}>Check-in:</Text>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{checkIn || "--"}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 16 }}>Check-out:</Text>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{checkOut || "--"}</Text>
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
                  R$ {selectedRoom.price.toFixed(2)}
                </Text>
              </View>

              <TouchableOpacity 
                style={{ 
                  backgroundColor: '#4b0505', 
                  padding: 18, 
                  borderRadius: 15, 
                  marginTop: 30, 
                  alignItems: 'center' 
                }}
                onPress={() => {
                  // Lógica para confirmar a reserva pode ser adicionada aqui
                  setIsReserveModalOpen(false);
                }}
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