import classNames from "classnames/bind";
import styles from './myOrder.module.scss'
import { useEffect, useMemo, useState } from "react";
import { myOrder } from "~/api-server/showOrder";
import { myBought } from "~/api-server/bought";
import axios from "axios";
import { statusOrder } from "~/api-server/GHN";
import statusDelivery from "./status";
const cx = classNames.bind(styles)

function MyOrder() {
    const [data,setData] = useState([])
    const [type,setType] = useState(1) // 1 is waiting to confirm and 2 is confirmed
    const [status,setStatus] = useState('Chờ xác nhận')
    useEffect(()=>{
        (async()=>{
            let data = []
            if(type==1){
                data = await myOrder()
            }
            else data= await myBought()
            setData(data)
        })()
    },[type])
    const handleChangeType = e => {
        setType(e.target.value*1)
    }

    useEffect(()=>{
        if(type==1) setStatus('Chờ xác nhận')
    },[type])
    const newData = useMemo(()=>{
       if(type===1){
            return data.reduce((first,item,index)=>{
                return [...first,...item?.infoOfOder]
            },[]) 
       }else{
            return data
       }
    },[JSON.stringify(data)])
    return <div className={cx('wrapper')}>
        <h1>Đơn hàng của tôi</h1>
        <div className={cx('container')}>
       <div className={cx('contain-select')}>
            <select onChange={handleChangeType}>
                <option value={1}>Đang chờ xác nhận</option>
                <option value={2}>Đã xác nhận</option>
            </select>
       </div>
        <table className={cx('table-item',{table:true})}>
        <thead>
            <tr>
            <th colSpan={1} scope="col">STT</th>
            <th colSpan={2} scope="col">Hình ảnh</th>
            <th colSpan={5} scope="col">Tên sản phẩm</th>
            <th colSpan={2} scope="col">Giá</th>
            <th colSpan={1} scope="col">Trạng thái</th>
            </tr>
        </thead>
        <tbody>
            {newData.map((item,index) =>{
                if(type===2 && item?.code){
                    const data = statusOrder(item?.code)
                    data.then(data=>{
                        const status = statusDelivery(data?.data?.data?.status)
                        setStatus(status);
                    })
                    data.catch(error=>{console.log(error);})
                }
                return <tr key={index}>
                <th colSpan={1} scope="row">{index+1}</th> 
                    <td colSpan={2}><img style={{width:'100px',objectFit:'cover'}} src={item.image} /></td>
                    <td colSpan={5}>{item.idProduct.name}</td>
                    <td colSpan={2}>{`${item.number} x ${item.price} = ${item.price*item.number}`}</td>
                    <td colSpan={1}>{status}</td>
                </tr>
            })}
            
        </tbody>
        </table>
        </div>
    </div>;
}

export default MyOrder;