import { global } from '@/components/ui/styles';
import { Text, View } from 'react-native';
import DateSelector from '../ui/DateSelector';

const RenderExplorer = () => {
  return (
    <View style={global.container}>
        <DateSelector/>
    </View>
  )
}  
export default RenderExplorer;