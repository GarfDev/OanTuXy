import React from 'react'

function NavibarStyler(startedofnot, username){
    if(startedofnot){
        return(<p>{username}</p>)
    }else{
        return(
        <div>
            <input id="navbar-input" placeholder="What is your name?"></input>
            <button onlick>Click me pls</button>
        </div>
        )
    }
}

export default function NaviBar(props) {
    return (
        <nav className={`navbar navbar-nav navbar-expand-md sticky-top`}>
            <div className="col-md-4 order-0">
            </div>
            <div className="col-md-4 order-1">
                <a className="navbar-brand" href="#"><img src="https://i.imgur.com/gKiwjFu.png" width="64" id="GarfieldIMG"></img></a>
            </div>
            <div className="col-md-4 order-2">
                {NavibarStyler(props.isStarted, props.username)}
            </div>
        </nav>
    )
}
