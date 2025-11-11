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
        fontSize: 22,
        fontWeight: "600",
        marginTop: height * 0.006
    },

    subTitle: {
        fontSize: 18,
        fontWeight: "600",
    },

    content: {
        backgroundColor: "#f3f3f3ff",
        borderRadius: 10,
        padding: width * 0.02,
        shadowColor: "#000000ff",
        elevation: 18,
        alignItems: "center"
    },

    hotelIcon: {
        fontSize: 42,
        color: "#4b0505"
    }

});