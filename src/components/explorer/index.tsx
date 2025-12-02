import { Dimensions, TouchableOpacity, View } from 'react-native';
import DateSelector from '../ui/DateSelector';
import TextField from '../ui/TextField';
import AuthContainer from '../ui/AuthContainer';
import { useState } from 'react';
import RoomCard from '../ui/RoomCard';

const RenderExplorer = () => {
 
  const { width, height } = Dimensions.get("window");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [calendar, setCalendar] = useState <"checkin" | "checkout">();

  return (

    <AuthContainer hasContentStyle={false}>
      <View style={{display: 'flex', justifyContent: 'center'}}>

        <View style={{display: 'flex', flexDirection: 'column'}}>
          <TouchableOpacity onPress={() => setCalendar("checkin")}>
            <View style={{width: width * 0.48}}>
              <TextField
                label='Chek-In'
                icon={{lib: "MaterialCommunityIcons", name: "calendar-blank"}}
                placeholder='Selecione a data'
              />
            </View>
          </TouchableOpacity>

          {calendar == "checkin" && (<DateSelector onSelectDate={(date) => {setCheckIn(date)}}/>)}
        </View>  

        <View style={{display: 'flex', flexDirection: 'column'}}>
          <TouchableOpacity onPress={() => setCalendar("checkout")}>
            <View style={{width: width * 0.48}}>
              <TextField
                label='Chek-Out'
                icon={{lib: "MaterialCommunityIcons", name: "calendar-blank"}}
                placeholder='Selecione a data'
              />
            </View>  
          </TouchableOpacity>
          
          {calendar == "checkout" && (<DateSelector onSelectDate={(date) => {setCheckOut(date)}}/>)}
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