import {
    Appearance,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import React from "react";
import tw from "twrnc"
import {useQuoteContext} from "../contexts/QuotesContext";
import {Controller, useForm} from "react-hook-form";
import {HOMESCREEN} from "../../navigationNames";

export const SettingsScreen = ({navigation}) => {

    const {settings, onUpdateSettings} = useQuoteContext()

    const {control, handleSubmit} = useForm({defaultValues: settings})

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={175}
            style={{flex: 1}}>
            <ScrollView style={tw.style("p-3")}>
                <InputField rules={{required: {value: true}}}
                            transform={text => Number(text) * 1000}
                            control={control} title={"interval"}
                            keyboardType={"number-pad"} metric={"seconds"}/>
                <ApplyButton onSave={handleSubmit(data => {
                    onUpdateSettings(data)
                    navigation.navigate(HOMESCREEN)
                })}/>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export const InputField = ({title, control, transform = text => text, rules, keyboardType = "default", metric}) => {

    return (
        <Controller name={title} control={control} rules={rules}
                    render={({field: {onChange, value}}) =>
                        <View
                            style={tw.style(`border-b mb-3 border-gray-800`)}>
                            <Text>
                                {title} {metric && `(${metric})`}
                            </Text>
                            <View style={tw.style("flex flex-nowrap mx-3 my-2")}>
                                <TextInput blurOnSubmit returnKeyType={"done"} value={(value / 1000) + ""}
                                           keyboardType={keyboardType}
                                           onChangeText={text => onChange(transform(text))}/>
                            </View>
                        </View>
                    }
        />
    )
}

export const ApplyButton = ({onSave}) => {

    return (
        <TouchableOpacity style={tw.style("rounded-full p-2 bg-blue-800 mt-5")}
                          onPress={() => onSave()}>
            <Text style={tw.style("text-white text-center text-lg")}>
                Apply
            </Text>
        </TouchableOpacity>
    )
}