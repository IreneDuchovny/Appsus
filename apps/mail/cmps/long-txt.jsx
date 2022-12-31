const { useState, useEffect } = React

export function LongTxt({ txt, length = 50 }) {
    const [txtToRender, setTxtToRender] = useState(txt.substring(0, length) + '...')

    useEffect(() => {
        const newTxt = txt.substring(0, length) + '...'
        setTxtToRender(newTxt)
    }, [])

    return <section className="long-txt">
        <p>{txtToRender}</p>
    </section>
}