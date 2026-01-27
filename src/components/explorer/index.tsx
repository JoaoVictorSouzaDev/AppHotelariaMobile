import { Text, Dimensions, TouchableOpacity, View, Pressable } from 'react-native';
import InputSpin from '../ui/InputSpin';
import DateSelector from '../ui/DateSelector';
import TextField from '../ui/TextField';
import AuthContainer from '../ui/AuthContainer';
import { useState, useRef } from 'react';
import RoomCard from '../ui/RoomCard';
import { global } from '../ui/styles';
import { Modal } from 'react-native';

const RenderExplorer = () => {
 
  const { width, height } = Dimensions.get("window");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [qntGuests, setQntGuests] = useState<number>(1);
  const [calendar, setCalendar] = useState <"checkin" | "checkout" | null>(null);
  const closeCalendar = () => setCalendar(null);

  return (

    <AuthContainer hasContentStyle={false}>
      <View style={{display: 'flex', justifyContent: 'center'}}>

        <View style={{display: 'flex', flexDirection: 'column'}}>
          <TouchableOpacity onPress={() => setCalendar("checkin")}>
            <View style={{width: width * 0.60}}>
              <TextField
                label='Chek-In'
                icon={{lib: "MaterialCommunityIcons", name: "calendar-blank"}}
                placeholder='Selecione a data'
              />
            </View>
          </TouchableOpacity>

        </View>  

        <View style={{display: 'flex', flexDirection: 'column'}}>
          <TouchableOpacity onPress={() => setCalendar("checkout")}>
            <View style={{width: width * 0.60}}>
              <TextField
                label='Chek-Out'
                icon={{lib: "MaterialCommunityIcons", name: "calendar-blank"}}
                placeholder='Selecione a data'
              />
            </View>  
          </TouchableOpacity>
          
        </View>  

        <Modal transparent animationType='fade' visible={calendar !== null} onRequestClose={closeCalendar}>
          
          <Pressable 
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.25)'
          }}
          onPress={closeCalendar}>
            <Pressable onPress={() => {}}>
              {calendar == "checkin" && (<DateSelector onSelectDate={(date) => {setCheckIn(date); closeCalendar(); }}/>)}
              {calendar == "checkout" && (<DateSelector onSelectDate={(date) => {setCheckOut(date); closeCalendar(); }}/>)}
            </Pressable>
          </Pressable>

        </Modal>
      

        <View>

          <Text style={global.label}>Número de hóspedes</Text>
          <InputSpin
            guests={qntGuests}
            onSelectSpin={(guests) => {
              setQntGuests(guests);
            }}
            minGuests={1}
            maxGuests={6}
            step={1}
            colorMax={"#4b0505"}
            colorMin={"#4b0505"}
          />

        </View>

      </View>

      <RoomCard
      image={require("../../../assets/images/ImageHotel.jpeg")}
      label='Quarto de Casal'
      icon={{
        lib: "MaterialCommunityIcons",
        name: "bed"
      }}
      description={{
        text: "1 Cama de casal\n2 Camas de solteiro",
        price: 180.99
      }}
      />

    </AuthContainer> 

  )

}  
export default RenderExplorer;