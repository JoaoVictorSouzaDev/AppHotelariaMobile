// RenderExplorer.tsx
import { Text, Dimensions, TouchableOpacity, View, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';
import { Modal } from 'react-native';
import InputSpin from '../ui/InputSpin';
import DateSelector from '../ui/DateSelector';
import TextField from '../ui/TextField';
import AuthContainer from '../ui/AuthContainer';
import RoomCard from '../ui/RoomCard';
import { global } from '../ui/styles';

const RenderExplorer = () => {
  const { width, height } = Dimensions.get("window");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [qntGuests, setQntGuests] = useState<number>(1);
  const [calendar, setCalendar] = useState<"checkin" | "checkout" | null>(null);

  const closeCalendar = () => setCalendar(null);

  
  const rooms = [
    { id: 1, label: 'Quarto Casal Premium', price: 180.99, text: "1 Cama de casal\nAr condicionado" },
    { id: 2, label: 'Suíte Família', price: 350.00, text: "2 Camas de casal\nVista para o mar" },
    { id: 3, label: 'Quarto Solteiro Luxo', price: 120.00, text: "1 Cama de solteiro\nFrigobar incluso" },
  ];

  return (
    <AuthContainer hasContentStyle={false}>
      <View>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Text style={global.title}>Home</Text>
        </View>

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

        <View style={{ alignItems: 'center', marginVertical: 15 }}>
          <Text style={global.label}>Número de hóspedes</Text>
          <InputSpin
            guests={qntGuests}
            onSelectSpin={setQntGuests}
            minGuests={1}
            maxGuests={6}
            step={1}
            colorMax={"#4b0505"}
            colorMin={"#4b0505"}
          />
        </View>

        <Text style={[global.label, { marginBottom: 10 }]}>Opções disponíveis:</Text>
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
              onPressReserve={() => alert(`Reservado: ${room.label}`)}
            />
          ))}
        </ScrollView>
      </View>

      <Modal transparent animationType='fade' visible={calendar !== null} onRequestClose={closeCalendar}>
        <Pressable style={global.absoluteOverlay} onPress={closeCalendar}>
          <Pressable onPress={() => {}}>
            {calendar === "checkin" && <DateSelector onSelectDate={(d) => {setCheckIn(d); closeCalendar();}} />}
            {calendar === "checkout" && <DateSelector onSelectDate={(d) => {setCheckOut(d); closeCalendar();}} />}
          </Pressable>
        </Pressable>
      </Modal>
    </AuthContainer>
  );
}

export default RenderExplorer;