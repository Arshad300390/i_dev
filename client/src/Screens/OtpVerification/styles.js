import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fontFamily from "../../styles/fontFamily";

const styles = StyleSheet.create({

    descStyle: {
        fontSize: 18,
        fontFamily: fontFamily.blackFont,
        marginLeft: 16,
        color: colors.grey,
        textAlign: 'center',
    },
    bottomText: {
        fontSize: 18,
        fontFamily: fontFamily.blackFont,
        marginLeft: 16,
        color: colors.grey,
        textAlign: 'center',
    },
    inputStyles: {
        marginRight: 8,
        height: 42,
        width: 42,
        borderBottomWidth: 1,
        textAlign: 'center',
    }
})
export default styles