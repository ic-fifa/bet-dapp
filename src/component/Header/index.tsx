import { PureComponent } from "react";
import { Link } from "react-router-dom";

export class Header extends PureComponent{
    render(){
        return(
            <div>
                <div><h1>Logo</h1></div>
                <div>
                    <ul>
                        <li><Link to="/" >Home</Link></li>
                        <li><Link to="/login" >Login</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}