import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function Spinloading() {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-op90 flex items-center justify-center z-50 ">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
        </div>
    )
}

export default Spinloading