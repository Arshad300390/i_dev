import { StyleSheet } from "react-native";
import Colors from "../../styles/colors";
import fontFamily from "../../styles/fontFamily";
const styles = StyleSheet.create({
    descStyle: {
        fontSize: 16,
        fontFamily: fontFamily.regular,
        textAlign: 'center',
        marginVertical: 16,
    },
    dialCodeStyle: {
        fontSize: 16,
        fontFamily: fontFamily.regular,
        marginVertical: 16,
    },
    phoneInputStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth :0.5,
        paddingHorizontal: 10},
});
export default styles;