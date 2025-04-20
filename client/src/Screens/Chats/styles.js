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
      listEmptyStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16
      },
      commStyle: {
        fontSize: 24,
        fontFamily: fontFamily.regular,
      },
      headingStyle: {
        fontSize: 26,
        fontFamily: fontFamily.regular,
      }
})
export default styles