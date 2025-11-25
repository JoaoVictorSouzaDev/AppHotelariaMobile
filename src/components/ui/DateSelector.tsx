import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import DatePicker, { getFormatedDate, getToday} from 'react-native-modern-datepicker';
import { global } from "./styles";

type Props = {
    label?: string;
}

const DateSelector = ({label}: Props) => {

    const [selectDate, setSelectedDate] = useState("");
    const tomorrow = new Date(getToday() +1);
    const startDate = getFormatedDate(tomorrow, 'YYYY/MM/DD');

    return (
        <View>
            {!!label && <Text>{label}</Text>}
            <DatePicker
                options={{
                mainColor: "#4b0505",
                textHeaderColor: "#4b0505",
                textFontSize: 16,
                }}
                style={{borderRadius: 16}}
                isGregorian={true}
                minimumDate={startDate}
                selected={selectDate}
                onSelectedChange={setSelectedDate}
            />


        </View>
    )
}

export default DateSelector;

/*
    const DateSelector = ({label}: Props) => {



        const [open, setOpen] = useState(false)
        const [date, setDate] = useState('2023/02/08')

        function handleOnPress () {
            console.log("Abrindo/Fechando Modal. Estado atual:", !open);
            setOpen(!open)
        }

        function handleChange(propDate: any) {
            setDate(propDate);
        }

        return (

            <View style={global.container}>

                <TouchableOpacity onPress={handleOnPress}>
                    <Text>Open</Text>
                </TouchableOpacity>

                <Modal
                animationType="slide"
                transparent={true}
                visible={open}
                >

                    <View style={global.centeredView}>
                        <View style={global.modalView}>

                        <DatePicker
                        mode="calendar"
                        minimumDate={startDate}
                        selected={date}
                        onSelectedChange={handleChange}
                        isGregorian={true}
                        />

                        <TouchableOpacity onPress={handleOnPress}>
                            <Text>Close</Text>
                        </TouchableOpacity>

                        </View>
                    </View>    
                </Modal>

            </View>

        );
    }
*/