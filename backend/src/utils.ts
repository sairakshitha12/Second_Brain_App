export function random(len:number){
    let options="sdfghghntyuikmnbzmbmvc36489091273564aslhruity";
    let length=options.length;
    let ans="";
    for (
        let i=0;i<len;i++){
            ans=ans+options[Math.floor((Math.random()*length))]
        }
        return ans;
}