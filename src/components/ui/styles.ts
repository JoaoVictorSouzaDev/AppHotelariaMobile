import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");


export const global = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFFF"
    },

    keyboardAvoid: {
        flex: 1,
    },

    container: {
        paddingHorizontal: width * 0.07,
        paddingTop: height * 0.05,
        paddingBottom: height * 0.05
    },

    header: {
        alignItems: "center",
        marginBottom: height * 0.02
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        marginTop: height * 0.006,
    },

    subTitle: {
        fontSize: 24,
        fontWeight: "700",
        alignSelf: "center",
        marginTop: height * 0.01,
    },

    content: {
        display: "flex",
        backgroundColor: "#f3f3f3",
        borderRadius: 20,
        padding: width * 0.02,
        shadowColor: "#000000ff",
        elevation: 18,
    },

    hotelIcon: {
        fontSize: 42,
        color: "#4b0505"
    },

    inputGroup: {
        marginBottom: height * 0.005,
        marginTop: height * 0.01,
        marginLeft: height * 0.01,
        marginRight: height * 0.01
    },

    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#141414ff",
        marginBottom: height * 0.005
    },

    inputIcon: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingLeft: width * 0.02,
        borderWidth: 2,
        borderColor: "#4b0505",
        borderRadius: 10
    },

    inputError: {
        backgroundColor: "#ff9292ff",
        borderColor: "red"
    },

    input: {
        flex: 1,
        fontSize: 17,
        color: "#000",
        fontWeight: "500",
        paddingHorizontal: width * 0.02
    },

    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: height * 0.005
    },

    icon: {
        color: "#4b0505",
        fontSize: 20
    },

});