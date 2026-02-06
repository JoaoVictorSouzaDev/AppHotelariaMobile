import InputSpinner from 'react-native-input-spinner';
import { Dimensions } from 'react-native';

type Props = {
    guests: number, 
    onSelectSpin: (guests: number) => void;
    minGuests: number;
    maxGuests: number;
    step: number;
};

const InputSpin = ({ guests, onSelectSpin, minGuests, maxGuests, step }: Props) => {
    const { width } = Dimensions.get("window");
    const vermelhoPadrao = "#4b0505";
    const cinzaDesativado = "#A9A9A9";
    const currentLeftColor = guests <= minGuests ? cinzaDesativado : vermelhoPadrao;
    const currentRightColor = guests >= maxGuests ? cinzaDesativado : vermelhoPadrao;

    return (
        <InputSpinner
            value={guests}
            onChange={onSelectSpin}
            max={maxGuests}
            min={minGuests}
            step={step}
            colorLeft={currentLeftColor}
            colorRight={currentRightColor}
            colorPress={guests >= maxGuests || guests <= minGuests ? undefined : vermelhoPadrao}
            activeOpacity={1} 
            background={"transparent"}
            buttonTextColor={"#FFFFFF"}
            style={{
                width: width * 0.45,
                backgroundColor: 'transparent',
            }}
        />
    )
}

export default InputSpin;