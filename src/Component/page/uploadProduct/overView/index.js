import styles from './overView.module.scss';
import classNames from 'classnames/bind';
import Input from '~/Input';
import { useEffect, useRef,useContext } from 'react';
import { Context } from '~/GlobalContext';

const cx = classNames.bind(styles);

function OverView({ setOverView,success=false,setSuccess,overView }) {
    const optionRef = useRef();
    const [{category},dispatch] = useContext(Context)
    const handleChangeName = (e) => {
        setOverView((props) => {
            return { ...props, name: e.target.value };
        });
    };
    const handleChangeType = (e) => {
        setOverView((props) => {
            return { ...props, type: e.target.value };
        });
    };
    const handleChangeDescription = (e) => {
        setOverView((props) => {
            return { ...props, description: e.target.value };
        });
    };
    useEffect(() => {
        if(success){
            optionRef.current.value = 'default'
            setSuccess(false)
        }
    }, [success]);
    // useEffect(()=>{
    //     if(Array.isArray(category) && category.length>0){
    //         setOverView((props) => {
    //             return { ...props, type:category[0].type };
    //         });
    //     }
    // },[JSON.stringify(category)])
    return (
        <div className={cx('wrapper')}>
            <Input w70 value={overView.name}  onChange={handleChangeName} classNames={cx('input')} placeholder="Tên sản phẩm" />
            <select ref={optionRef} defaultValue={overView.type} onChange={handleChangeType}>
                <option value='default'>Chọn loại</option>
                {category.map((item,index)=> <option key={item.slug} value={item.slug}>{item.type}</option>)}
            </select>
            <textarea value={overView.description} onChange={handleChangeDescription} placeholder="Mô tả sản phẩm..."></textarea>
        </div>
    );
}

export default OverView;
