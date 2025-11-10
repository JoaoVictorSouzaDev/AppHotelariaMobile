import { Dimensions, StyleSheet } from "react-native";

//Dimensions
const { width, height } = Dimensions.get("window");

export const global = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: "#fff"
    },

    keyboardAvoid: {
        flex: 1,
    },

    container: {
        paddingHorizontal: width * 0.07,
        paddingTop: height * 0.05,
        paddingBottom: height * 0.04
    },

    header: {
        alignItems: "center",
        marginBottom: height * 0.03
    },

    title: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: height * 0.006
    },

    subTitle: {
        fontSize: 16,
        fontWeight: "500"
    },

    content: {
        backgroundColor: "#f3f3f3f3",
        borderRadius: 10,
        padding: width * 0.02,
        shadowColor: "#000000ff",
        shadowRadius: 100,
        elevation: 18

    },

    hotelIcon: {
        fontSize: 42
    }

});