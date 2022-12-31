const { useState, useEffect } = React

export function LongTxt({ txt, length = 100 }) {
    const [isFullDisplay, setIsFullDisplay] = useState(false)
    const [txtToRender,setTxtToRender] = useState(txt.substring(0, length)+'...')

    useEffect(() => {
        const newTxt = isFullDisplay ? txt : txt.substring(0, length)+'...'
        setTxtToRender(newTxt)
    }, [isFullDisplay])

    return <section className="long-txt">
        <p>{txtToRender}</p>
    <button className="btn-read-more" onClick={()=>setIsFullDisplay(prev=>!prev)}>{isFullDisplay ? 'Read less' : 'Read more'}</button>
    </section>
}