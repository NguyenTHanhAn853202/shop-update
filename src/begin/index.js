import styles from './styles.module.scss';
import classNames from 'classnames/bind';

import { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import { logout } from '~/api-server/loginService';

import { Context } from '~/GlobalContext/index';
import Render from '~/renderTippy';
import { LOGIN } from '~/GlobalContext/key';

const cx = classNames.bind(styles);

function Begin() {
    const [states, dispatch] = useContext(Context);
    const checkLogin = states.login;
    const navigate = useNavigate();

    const handleClickLogout = async (e) => {
        dispatch({
            key: LOGIN,
            value: false,
        });
        const refreshToken = localStorage.refreshToken;
        await logout(refreshToken);
        navigate('/');
        window.location.reload(false);
    };

    return (
        <div className={cx('wrapper', { wrap: true })}>
            <div className={cx('contain', { grid: true })}>
                <h2 className={cx('sale')}>maitrungtin4732@gmail.com</h2>
                {!checkLogin ? (
                    <div className={cx('contain-from')}>
                        <Link to={'/account/login'} className={cx('login')}>
                            Đăng nhập
                        </Link>
                        <span>/</span>
                        <Link to={'/account/register'} className={cx('register')}>
                            Đăng kí
                        </Link>
                    </div>
                ) : (
                    <div className={cx('contain-account')}>
                        <Tippy
                            // visible
                            hideOnClick={false}
                            interactive
                            offset={[30, 14]}
                            placement="bottom-end"
                            interactiveBorder={0}
                            render={(attrs) => (
                                <Render classNames={cx('render-tippy')} attrs={attrs}>
                                    <div className={cx('list-items')}>
                                        <Link to={'/cap-nhat-thong-tin'}>Thông tin</Link>
                                        {(localStorage.role === 'manager' || localStorage.role === 'employee') && (
                                            <>
                                                <Link to={'/upload-product'}>Cập nhật sản phẩm</Link>
                                                <Link to={'/see-order'}>Xác nhận đơn hàng</Link>
                                                <Link to={'/thong-ke'}>Thống kê</Link>
                                            </>
                                        )}
                                        {localStorage.role === 'manager' && (
                                            <>
                                                <Link to={'/quan-ly/tao-tai-khoan'}>Tạo tài khoản cho nhân viên</Link>
                                                <Link to={'/quan-ly/vo-hieu-hoa-tai-khoan'}>Vô hiệu hóa tài</Link>
                                                <Link to={'/quan-ly/danh-muc'}>Chỉnh sữa danh mục</Link>
                                                
                                            </>
                                        )}
                                        <Link to='doi-mat-khau'>Đổi mật khẩu</Link>
                                        <Link>Đăng khi thành viên</Link>
                                        <Link to='/my-order'>Xem đơn hàng</Link>
                                        <Link> Đăng kí ví ANPAY</Link>
                                        <Link onClick={handleClickLogout}>Đăng xuất</Link>
                                    </div>
                                </Render>
                            )}
                        >
                            <div>
                                <h4 className={cx('account')}>Tài khoản</h4>
                            </div>
                        </Tippy>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Begin;
