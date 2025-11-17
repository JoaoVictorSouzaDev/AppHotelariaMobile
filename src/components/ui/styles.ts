import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");


export const global = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: "#f3f3f3",
        justifyContent: "center",
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
        fontSize: 22,
        fontWeight: "700",
        alignSelf: "center",
        marginTop: height * 0.01,
        marginBottom: height * 0.01,
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

    primaryButton: {
        backgroundColor: "#4b0505",
        borderRadius: 10,
        padding: width * 0.025,
        alignItems: "center",
        marginTop: height * 0.03,
        marginLeft: width * 0.02,
        marginRight: width * 0.02,
        marginBottom: height * 0.02
    },

    primaryButtonDisabled: {
        backgroundColor: "#9ca3af",
        borderRadius: 10,
    },

    primaryButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: 700
    },
    
    defaultText: {
        paddingLeft: width * 0.02,
        paddingTop: width * 0.01,
        fontSize: 14,
        lineHeight: 15,
        color: '#000',
    },
    
    registerLinkText: {
        fontSize: 14,
        lineHeight: 22,
        color: "#4b0505",
        fontWeight: "bold"
    },

    passwordResetDeiv: {
        alignItems: "center",
        marginBottom: height * 0.02
    },
    
    passwordReset: {
        fontWeight: "bold",
        color: "#4b0505",
        fontSize: 14
    },

    text: {
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center"
    },

    divText: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    screenContainer: {
        flex: 1,
    },

    divTurnLeft: {
        position: 'absolute',
        top: 50,
        left: 15,
        zIndex: 10
    }

});