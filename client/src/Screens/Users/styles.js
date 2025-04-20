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
      },
      headerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
      },
      newGroupText: {
        fontSize: 24,
        fontFamily: fontFamily.regular,
        color: colors.lightBlue,
        marginLeft: 16,
      },
      userName: {
        fontSize: 16,
        fontFamily: fontFamily.bold,
        marginLeft: 16,
        textTransform: 'capitalize',
      }
})
export default styles