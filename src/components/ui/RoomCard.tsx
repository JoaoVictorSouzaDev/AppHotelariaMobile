import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType, TouchableOpacity } from "react-native";

const { height, width } = Dimensions.get("window");

type Infos = { title?: string; text: string; price: number};
type NameIcon = {lib: "MaterialCommunityIcons"; name: keyof typeof MaterialCommunityIcons.glyphMap};

type Props = {
    image?: ImageSourcePropType;
    label?: string; 
    icon?: NameIcon; 
    description?: Infos; 
    onPressReserve?: () => void;
}

const RoomCard = ({image, label, icon, description, onPressReserve}: Props) => {
  return (
    <View style={style.cardContainer}> 
        {!!image && <Image style={style.image} source={image} resizeMode="cover"/>}
        
        <View style={style.textualContent}>
            {!!label && <Text style={style.mainLabel}>{label}</Text>}

            {!!description && (
                <View style={style.detailRow}>
                    <View style={style.iconContainer}>
                        {icon?.lib === "MaterialCommunityIcons" && (
                            <MaterialCommunityIcons name={icon.name} size={23} color="#4b0505" />
                        )}
                    </View>
                    
                    <View style={style.descriptionTextContainer}>
                        <Text style={style.descriptionText}>{description.text}</Text>
                    </View>

                    <View style={style.priceContainer}>
                        <Text style={style.price}>R$ {description.price}</Text>
                    </View>
                </View>
            )}

            <TouchableOpacity style={style.reserveButton} onPress={onPressReserve}>
                <Text style={style.reserveButtonText}>Reservar Agora</Text>
            </TouchableOpacity>
        </View>
    </View>
  )};

const style = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff', 
    borderRadius: 25,
    overflow: 'hidden', 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.85,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  image: { height: height * 0.22, width: "100%" },
  textualContent: { padding: 15 },
  mainLabel: { fontSize: 20, fontWeight: '700', color: '#333', marginBottom: 5 },
  detailRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  iconContainer: { marginRight: 8 },
  descriptionTextContainer: { flex: 1 },
  descriptionText: { fontSize: 13, color: '#666' },
  priceContainer: { alignItems: 'flex-end' },
  price: { fontSize: 18, fontWeight: 'bold', color: "#28a745" },
  reserveButton: {
    backgroundColor: '#4b0505',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 5
  },
  reserveButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 }
});

export default RoomCard;