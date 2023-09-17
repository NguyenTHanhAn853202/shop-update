import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import { handleSlug } from '~/handleSlug';
import { useEffect,useContext } from 'react';
import productImg from '~/media/image/product/product-1.jpg';
import Product from '~/Component/product';
import { Context } from '~/GlobalContext';
const cx = classNames.bind(styles);



function SideBar() {
    const [{category},dispatch] = useContext(Context)
    return (
        <div className={cx('wrapper')}>
            <div className={cx('typeof')}>
                <Link to="" className={cx('title-typeof')}>
                    DANH MỤC SẢN PHẨM
                </Link>
                {category.map((item, index) => {
                    return (
                        <NavLink
                            to={item?.slug}
                            key={index}
                            className={(nav) => cx('item-typeof', { active: nav.isActive })}
                        >
                            {item?.type}
                        </NavLink>
                    );
                })}
            </div>
            <div className={cx('product')}>
                <Product
                    
                />
            </div>
        </div>
    );
}

export default SideBar;
