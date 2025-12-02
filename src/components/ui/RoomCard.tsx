import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType } from "react-native";
import { global } from "./styles"; 

const { height } = Dimensions.get("window");

type Infos = 
| { title?: string; text: string; price: number};

type NameIcon = 
| {lib: "MaterialCommunityIcons"; name: keyof typeof MaterialCommunityIcons.glyphMap};

type Props = {
    image?: ImageSourcePropType;
    label?: string; 
    icon?: NameIcon; 
    description?: Infos; 
}

const RoomCard = ({image, label, icon, description}: Props) => {
  return (
    <View style={style.cardContainer}> 
        {!!image &&
            <Image style={style.image} source={image} resizeMode="cover"/>
        }
        
        <View style={style.textualContent}>
            {!!label && <Text style={style.mainLabel}>{label}</Text>}

            {!!description && (
                <View style={style.detailRow}>
                    
                    {!!icon && (
                        <View style={style.iconContainer}>
                            {icon.lib === "MaterialCommunityIcons" && (
                                <MaterialCommunityIcons 
                                    name={icon.name} 
                                    size={23} 
                                    color="#4b0505" 
                                />
                            )}
                        </View>
                    )}
                    
                    <View style={style.descriptionTextContainer}>
                        <Text style={style.descriptionText}>{description.text}</Text>
                    </View>

                    <View style={style.priceContainer}>
                        <Text style={style.price}>R$ {description.price}</Text>
                    </View>
                </View>
            )}
        </View>
    </View>
  )};

const style = StyleSheet.create({
  cardContainer: {
    ...global.content, 
    backgroundColor: '#fff', 
    borderRadius: 25,
    overflow: 'hidden', 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  
  image: {
    height: height * 0.27,
    borderRadius: 24,
    width: "100%", 
  },

  textualContent: {
    paddingHorizontal: 15, 
    paddingBottom: 15,
    paddingTop: 10,
  },

  mainLabel: {
    fontSize: 23, 
    fontWeight: '700', 
    marginBottom: 10, 
    color: '#333',
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", 
  },

  iconContainer: {
    marginRight: 10, 
  },

  descriptionTextContainer: {
    flex: 1, 
    marginRight: 10,
    justifyContent: 'center',
  },
  
  descriptionText: {
    fontSize: 14,
    color: '#444',
  },

  priceContainer: {
    alignItems: 'flex-end',
    minWidth: 80, 
  },
  
  price: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: "#28a745", 
  },
});

export default RoomCard;