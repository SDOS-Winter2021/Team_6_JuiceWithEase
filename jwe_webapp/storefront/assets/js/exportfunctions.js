import {pincode_api} from "./constants.js";

/*This function take a pincode as the argument and return Promise<boolean> indicating whether that pincode is serviceable or not */
export async function check_pincode(user_pincode="") {
    try {
        let response = await fetch(pincode_api);
        let res = await response.json();
        let x;
        for(x in res){
            if (res[x].pincode == user_pincode){
                return true;
            }
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}