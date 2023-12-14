import type { RouteRecord } from "vue-router";
import router from "@/router";

export function getUserSubMeun(userMeun:any) {
    const theRoutes:RouteRecord[] = []
    const files :Record<string, any> = import.meta.glob('../router/main/**/*.ts',
    {
        eager:true
    })

    for(const key in files) {
        const modules = files[key]
        theRoutes.push(modules.default)
    }
    
    console.log(userMeun);
    
    for(const meun in userMeun){
        for(const subMeun in userMeun[meun].children){
            const route = theRoutes.find((item)=>{return item.path===(userMeun[meun].children[subMeun].url)})
            // console.log(route);
            if(route){
                router.addRoute('main',route)
            }
        }
    }

}