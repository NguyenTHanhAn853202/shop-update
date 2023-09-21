import classNames from 'classnames/bind';
import styles from './card.module.scss';
import Button from '~/button';
import { useEffect, useRef, useState } from 'react';
import { confirm } from '~/api-server/showOrder';
import { createItem, getDistrict } from '~/api-server/GHN';

const cx = classNames.bind(styles);

function Card({ user, order, idOrder,item }) {
    const { name, avatar } = user;
    const [products, setProducts] = useState(order);
    const weightRef = useRef()
    const heightRef = useRef()
    const widthRef = useRef()
    const lengthRef = useRef()



    const handleClickConfirm = async (itemProduct, i,item) => {
            console.log(item);
        if (products.length > 0 && weightRef.current.value !=='' && heightRef.current.value !==''
            && widthRef.current.value !=='' && lengthRef.current.value !==''
        ) {
            
            const data = await createItem(item.toName,item.toPhoneNumber,item.toSpecificAddress,item.toVillage,item.toDistrict
                ,itemProduct.price*itemProduct.number,weightRef.current.value*1,lengthRef.current.value*1,widthRef.current.value*1,
                   heightRef.current.value*1,itemProduct.number,itemProduct.idProduct.name,itemProduct.price
                )
            if(data.data.code ===200){
                const orderCode = data.data.data.order_code
                const dataConfirm = await confirm(idOrder, itemProduct._id,orderCode);
                setProducts((props) => {
                    console.log(props.splice(i, 1));
                    return props.splice(i, 1);
                });
            }
            
        }
    };
    return (
        <div className={cx('wrapper')}>
            {products.length > 0 && (
                <>
                    <div className={cx('buyer')}>
                        <img src={avatar} alt={name} />
                        <div className={cx('info-buyer')}>
                            <h1>{`${item.toName} - ${item.toPhoneNumber}`}</h1>
                            <h2>{`Địa chỉ: ${item.address}`}</h2>
                            <h2>{`Địa chỉ cụ thể: ${item.toSpecificAddress}`}</h2>
                        </div>
                    </div>
                    <h1>Sản phẩm</h1>
                </>
            )}
            {products.map((itemProduct, i) => (
                <div key={itemProduct._id} className={cx('product')}>
                    <img src={itemProduct.image} alt={'anh san pham'} />
                    <div className={cx('info-product')}>
                        <h1>{`${itemProduct?.idProduct?.name}`}</h1>
                        <h2>{`Size: ${itemProduct?.size} - Số lượng: ${itemProduct?.number} - Giá: ${itemProduct?.price}VND`}</h2>
                    </div>
                    <div className={cx('info-item')}>
                        <p>Thông tin đơn hàng</p>
                        <input ref={weightRef} placeholder="khối lượng" type="number" min={0}/>
                        <input ref={heightRef} placeholder="Chiều cao" type="number" min={0}/>
                        <input ref={widthRef} placeholder="Chiều rộng" type="number" min={0}/>
                        <input ref={lengthRef} placeholder="Chiều dài" type="number" min={0}/>
                    </div>
                    <Button ishover onClick={() => handleClickConfirm(itemProduct, i,item)} classNames={cx('btn')}>
                        Xác nhận
                    </Button>
                </div>
            ))}
            {products.length > 0 && <span></span>}
        </div>
    );
}

export default Card;
