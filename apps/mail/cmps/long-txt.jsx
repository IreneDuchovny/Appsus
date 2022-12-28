const { useState } = React

export function LongTxt({ txt, length }) {

    const [isShowMore, setIsShowMore] = useState(false)

    function getTxtToShow(txt, length) {
        return (txt.length < length || isShowMore) ? txt : txt.substring(0, length + 1) + '...'
    }

    function onToggleShowMore() {
        setIsShowMore(prevLongTxtShown =>!prevLongTxtShown)
    }

    return <article className="long-txt">
        <p>{getTxtToShow(txt, length)}</p>
        {txt.length > length && <a onClick={onToggleShowMore}>{isShowMore ? 'Show Less' : 'Show More'}</a>}
</article>
}