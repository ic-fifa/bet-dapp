import { Header } from "../Header";
import { PureComponent } from "react";

export default class MainLayout extends PureComponent{
    render(){
        const { children } = this.props;
        return(
            <>
            <Header />
              {children}
            </>
          
        )
    }
}