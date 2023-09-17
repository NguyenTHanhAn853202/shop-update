import styles from './styles.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function StoreImage() {
    const imgArr = [
        'https://hellothucung.com/wp-content/uploads/2022/10/ca-rong-huyet-long-hellothucung-1.jpg',
        'https://blogchomeo.com/wp-content/uploads/2022/11/channa_barca_eric_er8.webp',
        'https://cdn.eva.vn/upload/4-2020/images/2020-10-29/image14-1603963733-722-width600height400.jpg',
        'https://static1.cafeland.vn/cafelandnew/hinh-anh/2020/08/26/144/image-20200826164105-1.jpeg',
        'https://chohanghoa.com.vn/wp-content/uploads/2022/05/ho-ca-koi-dep-1.jpg',
        'https://shopheo.com/wp-content/uploads/2021/05/thuc-an-cho-ca-betta-thuc-an-kho.jpg',
        'https://aquamart.vn/wp-content/uploads/2021/05/tetra-color-768x768.jpg',
        'https://aquamart.vn/wp-content/uploads/2021/05/thuc-an-vien-dan-luxury-mix-768x768.jpg',
        'https://cacanhdep.vn/upload/filemanager/Th%C3%A1ng%204/PARAKILL-scaled.jpg',
        'https://cacanhdep.vn/upload/filemanager/Th%C3%A1ng%204/Thu%C3%B4%CC%81c%20cho%20c%C3%A1%20AntiStress%205.jpg',
    ];
    return (
        <div className={cx('wrapper', { wrap: true })}>
            <div className={cx('contain', { grid: true })}>
                {imgArr.map((item, index) => (
                    <div key={index} className={cx('contain-img')}>
                        <img className={cx('img')} src={item} alt="gallery" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StoreImage;
