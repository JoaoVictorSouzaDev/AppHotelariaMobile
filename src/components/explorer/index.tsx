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

    <AuthContainer hasContentStyle={false}>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>

        <View style={{display: 'flex', flexDirection: 'column'}}>
          <TouchableOpacity onPress={() => setCalendar("checkin")}>
            <View style={{width: width * 0.42}}>
              <TextField
                label='Chek-In'
                icon={{lib: "MaterialCommunityIcons", name: "calendar-blank"}}
                placeholder='Selecione a data de Check-In'
              />
            </View>
          </TouchableOpacity>

          {calendar == "checkin" && (<DateSelector onSelectDate={(date) => {setCheckIn(date)}}/>)}
        </View>  

        <View style={{display: 'flex', flexDirection: 'column'}}>
          <TouchableOpacity onPress={() => setCalendar("checkout")}>
            <View style={{width: width * 0.42}}>
              <TextField
                label='Chek-Out'
                icon={{lib: "MaterialCommunityIcons", name: "calendar-blank"}}
                placeholder='Selecione a data de Check-Out'
              />
            </View>  
          </TouchableOpacity>
          
          {calendar == "checkout" && (<DateSelector onSelectDate={(date) => {setCheckOut(date)}}/>)}
        </View>  

      </View>
    </AuthContainer> 

  )

}  
export default RenderExplorer;