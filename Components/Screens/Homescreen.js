import {useQuoteContext} from "../contexts/QuotesContext";
import React from "react";
import {Text, TouchableOpacity, View} from "react-native"
import tw from 'twrnc'

export const HomeScreen = () => {

    const {quote, newQuote, ResetInterval} = useQuoteContext()

    if (quote)
        return (
            <View style={tw.style("flex justify-center w-full h-full ")}>
                <View style={tw.style("px-3 pb-10")}>
                    <TouchableOpacity onPress={() => {
                        newQuote()
                        ResetInterval()
                    }}>
                        <Text style={tw.style("text-2xl my-3 italic font-bold text-center")}>
                            {quote.text}
                        </Text>
                        {quote.author &&
                        <Text style={tw.style("text-right mt-5 text-lg mr-3 italic")}>
                            - {quote.author}
                        </Text>}
                    </TouchableOpacity>
                </View>
            </View>
        )

    return (
        <View>
            <Text>
                Loading...
            </Text>
        </View>
    )
}