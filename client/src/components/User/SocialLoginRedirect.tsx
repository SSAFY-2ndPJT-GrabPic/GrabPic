import React,{ useEffect } from "react"
import { useCookies } from "react-cookie"

export const SocialLoginRedirect : React.FC = () => {
    const [cookie] = useCookies(['access']);

    useEffect(() => {
        getToken();
        console.log("redirect");
        console.log(cookie);
    })

    const getToken = () => {
        if(cookie.access){
            localStorage.setItem("accessToken",cookie.access);
        }
    }

    return(
        <>
        </>
    )
}