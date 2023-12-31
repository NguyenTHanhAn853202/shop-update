import styles from './uploadProduct.module.scss';
import classNames from 'classnames/bind';
import OverView from './overView';
import Type from './type';
import { useRef, useEffect, useMemo, useState } from 'react';
import Default from '~/announcement/accept';
import { uploadProduct } from '~/api-server/productServer';
import NotifyContainer, { notify } from '~/utils/notification';
import { useLocation } from 'react-router-dom';
import { modify as modifyAPI } from '~/api-server/productServer';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function UploadProduct() {
    const location = useLocation()

    const product = location.state?.product
    const modify = location?.state?.modify
    const [isShow, setIsShow] = useState(false);
    const [agree, setAgree] = useState(false);
    const [infoProduct, setInfoProduct] = useState([]);
    const [overView, setOverView] = useState({
        name:product?.name||'',type:product?.type||'',description:product?.description||''
    }); 
    const navigate = useNavigate()
    const [successO, setSuccessO] = useState(false)
    const [successT, setSuccessT] = useState(false)

    const infoRef = useRef()

    useEffect(() => {
        if (agree) {
            (async () => {
                try {
                    const formData = new FormData();
                    const {file:images,fileUpdate,...others} = infoProduct
                    images.forEach((image) => {
                        formData.append('image',image)
                    })
                    // console.log(fileUpdate);
                    fileUpdate.forEach((image) => {
                        formData.append('fileUpdate',image)
                    })
                    formData.append('price',others.price)
                    formData.append('number',others.number)
                    formData.append('size',others.size)
                    formData.append('name',overView.name)
                    formData.append('type',overView.type)
                    formData.append('description',overView.description)
                    formData.append('id',localStorage?.id || null)
                    if(product?._id )formData.append('idProduct',product._id)
                    let data

                    if(modify){
                        data = await modifyAPI(formData,{
                            headers:{
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                    }else{
                            data = await uploadProduct(formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            });
                    }
                    if(data?.success){
                        notify('success',data.message); 
                        setSuccessO(data.success)
                        setSuccessT(data.success)
                        setOverView(props=>({...props,name:'',description:''}))
                    }
                    else{
                        notify('error','Cập nhật thất bại, hãy thử kiểm tra lại kích thước file')
                    }
                    setAgree(false);
                    if(modify && data.success) {
                        alert('Chỉnh sữa thành công')
                        navigate('/cua-hang')
                    }
                } catch (error) {
                    notify('error','Cập nhật thất bại, hãy thử kiểm tra lại kích thước file')
                    
                    // console.log(error);
                }
                
            })();
        }
    }, [agree]);

    const handleSubmit = (e) => {
        const data = infoRef.current.info
        setInfoProduct(data)        
        setIsShow(true);
    };
    return (
        <div className={cx('wrapper', { wrap: true })}>
            <NotifyContainer />
            {isShow && (
                <Default
                    title={'Xác nhận'}
                    message="Bạn có muốn cập nhật món hàng này"
                    setIsShow={setIsShow}
                    setAgree={setAgree}
                />
            )}
            <div className={cx('contain', { grid: true })}>
                <div className={cx('overview')}>
                    <OverView location={location} success={successO} setSuccess={setSuccessO} overView={overView} setOverView={setOverView} />
                </div>
                
                    <div className={cx('info')}>
                        <Type location={location}  success={successT} setSuccess={setSuccessT}  ref={infoRef} />
                    </div>
                <div className={cx('btn')}>
                    <button onClick={handleSubmit} className={cx('comfirm')}>
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UploadProduct;
