import { StyleSheet } from "react-native";
import Colors from "../../styles/colors";
import fontFamily from "../../styles/fontFamily";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        color: 'black',
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    logoStyle: {
        width: 380,
        height: 400,
        alignSelf: 'center',
    },
    headingStyle: {
        fontSize: 24,
        fontFamily: fontFamily.bold,
        alignSelf: 'center',
    },
    descStyle: {
        fontSize: 16,
        fontFamily: fontFamily.regular,
        textAlign: 'center',
        marginTop: 16,
    },
    agreeContinue: {
        flex: 1,
        fontSize: 20,
        fontFamily: fontFamily.bold,
        color: Colors.blue,
        marginTop: 24,
        alignSelf: 'center',
    },
});
export default styles;