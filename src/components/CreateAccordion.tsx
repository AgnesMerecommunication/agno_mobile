import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { paletteColor } from '../themes/Utility';

interface PropsAccordion {
    onPress: (params: any) => any;
    children: any;
    expanded: boolean;
    title: string;
}

const CreateAccordion = ({ onPress, children, expanded, title }: PropsAccordion) => {
    return (

        <View>
            <TouchableHighlight underlayColor="transparent" onPress={onPress}>
                <View style={styles.button}>
                    <CustomText fontWeight="bold" fontSize={20}>{title}</CustomText>
                    <MaterialCommunityIcons name={expanded ? "chevron-up" : "chevron-down"} color={paletteColor.ORANGE} size={30} />
                </View>
            </TouchableHighlight>
            {expanded && children}
        </View>
    )
}

export default CreateAccordion

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 17,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: paletteColor.GRAY,
        borderBottomWidth: 1,

    },

})