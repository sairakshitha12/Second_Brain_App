// import "../../index.css"; 
import { ReactElement } from 'react'; 

type variants="primary"  | "secondary"
 interface ButtonProps{
    variant:"primary" | "secondary";
    size:"sm" | "md" | "lg";
    text:string;
    startIcon:any;
    endIcon?:any;
    onClick?:()=>void;
    fullWidth?:boolean;
    loading?:boolean;
}
const varientStyle ={
    "primary":"bg-purple-300 text-purple-600" ,
    "secondary":"bg-purple-600  text-white "
}
const defaultStyles="rounded-md flex items-center"
const sizeStyles={
    "sm":"py-2 px-5",
    "md":"py-2 px-5",
    "lg":"p-6"
}



export function Button(props:ButtonProps){

    return <button onClick={props.onClick} 
    className={`${varientStyle[props.variant]} ${props.fullWidth ? "w-full flex justify-center items-center " :""}
    
     ${defaultStyles} ${sizeStyles[props.size || "md"]} ${props.loading ? "opacity-45":""} `} disabled={props.loading}>
        {props.startIcon ? <div className='pr-2'> {props.startIcon}</div>:null}{props.text}{props.endIcon}
        </button>
}
/* <Button variant="primary" size='md' onClick={()=>{}} text='asdgh'/> */