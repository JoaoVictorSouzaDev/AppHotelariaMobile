import InputSpinner from 'react-native-input-spinner';

type Props = {
    onSelectSpin: (guests: number) => void;
};

const InputSpin = ({onSelectSpin} : Props ) => {
    return (
        <InputSpinner
            max={6}
            min={1}
            step={1}
            colorMax={"#f04048"}
            colorMin={"#40c5f4"}
        />
    )
}

export default InputSpin;