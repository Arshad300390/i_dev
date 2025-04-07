import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fontFamily from "../../styles/fontFamily";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      descStyle: {
        fontSize: 12,
        fontFamily: fontFamily.blackFont,
        flex: 1,
        marginLeft: 16,
        color: colors.grey,
      },
})
export default styles