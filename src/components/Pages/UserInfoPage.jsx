import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getUserById } from '../../api/userApi';
import { updateUserById } from '../../api/userApi'; 


const UserInfoPage = () => {
    const { user } = useContext(AuthContext);
    const [userNew, setUserNew] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [userEdit, setUserEdit] = useState({});

    const fetchUser = async () => {
        try {
            const res = await getUserById(user.id);
            setUserNew(res.data.data || res.data);
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    useEffect(() => {
        if(user) {
             fetchUser();
        }
    }, [user]);

    const handleEdit = () => {
        setUserEdit(userNew);
        setIsEdit(true);
    };

    const handleSubmit = async () => {
        try {
            await updateUserById(user.id, userEdit);
            alert("Cập nhật thành công");
            fetchUser();
            setIsEdit(false);
        } catch (error) {
            alert("Lỗi: " + error.response?.data?.message);
        }
    };

    if (!userNew) {
        return <div>Đang tải thông tin người dùng...</div>;
    }

    return (
        <div>
            <h1>tên: {userNew.user_name}</h1>
            <h1>email: {userNew.email}</h1>
            <h1>sdt: {userNew.phone_number}</h1>
            <button onClick={handleEdit}>Sửa thông tin</button>
            {
                isEdit && (
                    <>
                        <input type='text' placeholder='Nhập email mới' value={userEdit.email} onChange={e => {
                            const email = e.target.value;
                            setUserEdit(prev => ({
                                ...prev,
                                email: email
                            }))
                        }} />
                        <input type='text' placeholder='Nhập số điện thoại mới' value={userEdit.phone_number} onChange={e => {
                            const phone_number = e.target.value;
                            setUserEdit(prev => ({
                                ...prev,
                                phone_number: phone_number
                            }))
                        }} />
                        <button onClick={() => setIsEdit(false)}>Hủy</button>
                        <button onClick={handleSubmit}>Lưu</button>
                    </>
                )
            }
        </div>
    );
}

export default UserInfoPage;