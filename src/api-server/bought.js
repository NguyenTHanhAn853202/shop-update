import request from "~/utils/Api/request";

export const myBought = async ()=>{
    try {
        const data = await request.get('bought/my-bought',{
            params: {
                id:localStorage.id
            }
        })
        return data.data.data
    } catch (error) {
        console.log(error);
    }
}

export const  statistic = async(year)=>{
    try {
        const data = await request.post('bought/list-bought',{
           year:year,
           id:localStorage.id
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}