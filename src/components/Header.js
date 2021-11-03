import React from "react";
import Titulo from "./Titulo";

export default class Header extends React.Component{
    constructor(){
        super();
    }
    render(){
        return <header>
            <Titulo/>
        </header>;
    }
}
