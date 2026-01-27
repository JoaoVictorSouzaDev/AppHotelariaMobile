import InputSpinner from 'react-native-input-spinner';
import { Dimensions } from 'react-native';

type Props = {
    guests: number, 
    onSelectSpin: (guests: number) => void;
    minGuests: number;
    maxGuests: number;
    step: number;
    colorMax?: string;
    colorMin?: string;
};

const InputSpin = ({guests, onSelectSpin, minGuests, maxGuests, step, colorMax, colorMin} : Props ) => {
    const { width, height } = Dimensions.get("window");

    return (
        <InputSpinner
            value={guests}
            onChange={onSelectSpin}
            max={maxGuests}
            min={minGuests}
            step={step}
            colorMax={colorMax}
            colorMin={colorMin}
            style={{
                width: width * 0.45,
            }}
        />
    )
}

export default InputSpin;