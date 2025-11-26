import { global } from '@/components/ui/styles';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import DateSelector from '../ui/DateSelector';
import TextField from '../ui/TextField';
import AuthContainer from '../ui/AuthContainer';
import { useState } from 'react';

const RenderExplorer = () => {

  const { width, height } = Dimensions.get("window");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [calendar, setCalendar] = useState <"checkin" | "checkout">();

  return (

    <AuthContainer>
      <View>

        <TouchableOpacity onPress={() => setCalendar("checkin")}>
          <TextField
            label='Chek-In'
            icon={{lib: "MaterialCommunityIcons", name: "calendar-blank"}}
            placeholder='Selecione a data de Check-In'
          />
        </TouchableOpacity>

        {
        calendar == "checkin" && (
          <DateSelector onSelectDate={(date) => {setCheckIn(date)}}/>
        )}

        <TouchableOpacity onPress={() => setCalendar("checkout")}>
          <TextField
            label='Chek-Out'
            icon={{lib: "MaterialCommunityIcons", name: "calendar-blank"}}
            placeholder='Selecione a data de Check-Out'
          />
        </TouchableOpacity>
        
        {
        calendar == "checkout" && (
          <DateSelector onSelectDate={(date) => {setCheckOut(date)}}/>
        )}
          
      </View>
    </AuthContainer> 

  )

}  
export default RenderExplorer;