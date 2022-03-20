import React, {useCallback, useContext, createContext, useEffect, useState, useMemo, useRef} from "react";


const QuoteContext = createContext()
export const useQuoteContext = () => useContext(QuoteContext)

export const QuotesProvider = ({children}) => {

    const [quotes, setQuotes] = useState([])
    const [currentQuote, setCurrentQuote] = useState({})
    const [showedQuoteIds, setShowedQuoteIds] = useState([])
    const [quoteInterval, setQuoteInterval] = useState(1000)
    const refreshQuote = useRef()

    const settings = useMemo(() => ({interval: quoteInterval}), [quoteInterval])

    useEffect(() => {
        const FetchQuotes = async () => {
            if (quotes?.length > 0) return
            const result = await fetch("https://type.fit/api/quotes")
            const data = await result.json()
            const quotes = data.map((obj, index) => obj.id ? obj : {...obj, id: (index + 1)})
            setQuotes(quotes)
        }
        FetchQuotes().then(() => null)
    }, [quoteInterval])

    useEffect(() => {
        if (!quotes?.[0]) return
        newQuote()
        ResetInterval()
    }, [quotes])

    useEffect(() => {
        if (showedQuoteIds.length < 100) return
        setShowedQuoteIds(prevState => {
            prevState.pop()
            return prevState
        })
    }, [showedQuoteIds])

    const onUpdateSettings = useCallback((newSettings) => {
        setQuoteInterval(newSettings.interval)
    }, [settings])

    const newQuote = useCallback(() => {
        let id;
        while (!id || (showedQuoteIds.find(shownId => shownId === id) && id !== currentQuote.id)) {
            id = Math.floor(Math.random() * quotes.length) + 1
        }
        setShowedQuoteIds(prevState => [currentQuote.id, ...prevState])
        const quote = quotes.find(obj => obj.id === id)
        setCurrentQuote(quote)
    }, [showedQuoteIds, currentQuote, setShowedQuoteIds, setCurrentQuote, quotes])


    const ResetInterval = useCallback(() => {
        clearInterval(refreshQuote.current)
        if (quoteInterval) {
            refreshQuote.current = setInterval(() => newQuote(), quoteInterval)
        }
    }, [refreshQuote, quoteInterval, newQuote])

    const QuoteAPI = useMemo(() => ({quote: currentQuote, settings, onUpdateSettings, newQuote, ResetInterval}),
        [currentQuote, settings, onUpdateSettings, newQuote, ResetInterval])

    return(
        <QuoteContext.Provider value={QuoteAPI}>
            {children}
        </QuoteContext.Provider>
    )

}