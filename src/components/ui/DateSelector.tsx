import {Dimensions, View } from "react-native";
import DatePicker, { getToday} from 'react-native-modern-datepicker';

type Props = {
    onSelectDate: (date : string) => void
}

const DateSelector = ({onSelectDate} : Props) => {

    const { width, height } = Dimensions.get("window");
    const startDate = getToday();
    const handleChange = (date: string) => {
        onSelectDate?.(date);
    };

    return (
        <View>

            <DatePicker
                mode="calendar"
                options={{
                mainColor: "#4b0505",
                textHeaderColor: "#4b0505",
                textDefaultColor: "#4b0505",
                textSecondaryColor: "#4b0505",
                textFontSize: 14,
                textHeaderFontSize: 16
                }}
                style={{borderRadius: 15, width: width * 0.62, height: height * 0.35}}
                isGregorian={true}
                minimumDate={startDate}
                onSelectedChange={handleChange}
                onDateChange={handleChange}
            />

        </View>
    )

};

export default DateSelector;
