import React from 'react'

function renderHistory(history){
    let rockPercent = Math.round(history.filter(({uChoice, res}) => uChoice==="rock" && res==="Victory!").length/history.length*100)
    let paperTimes = Math.round(history.filter(({uChoice, res}) => uChoice==="paper" && res==="Victory!").length/history.length*100)
    let scissorsTimes = Math.round(history.filter(({uChoice, res}) => uChoice==="scissors" && res==="Victory!").length/history.length*100)   
    return history.length> 0 && `You have ${rockPercent}% win rate with rock, ${paperTimes}% with paper and ${scissorsTimes}% with scissors`
}

function historyStyler(result){
    if(result==="Victory!"){return "victory"}
    else if(result==="Defeat!"){return "Defeat"}
    else{return "win-win"}
}

export default function HistoryBoard(props) {
    return (
        <div className="historyBoard">
            <div className="history-stack">
                {renderHistory(props.his)}
            </div>
            <div className="history">
                {props.his.map(({res}) => (
                <button className={historyStyler(res)} id="history-Button">{res}</button>
                ))}
            </div>
        </div>
    )
}
