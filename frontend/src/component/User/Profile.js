import React, { useEffect } from 'react';
import { useLoadUserQuery } from '../../services/User';
import MetaData from '../layout/MetaData';
import { Link, useHistory } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import './Profile.css';

const Profile = () => {
    const { data, isLoading, isSuccess: profileSuccess, isError: profileError } = useLoadUserQuery(undefined);
    const history = useHistory();

    useEffect(() => {
        if (!profileSuccess || profileError) {
            history.push("/login");
        }
    }, [profileSuccess, profileError, history]);

    return isLoading ? (
        <Loader />
    ) : (
        <>
            <MetaData title={data.user.name} />
            <div className="profileContainer">
                <div>
                    <h1>My Profile</h1>
                    <img src={data.user?.avatar?.url} alt={data.user.name} />
                    <Link to="/me/update">Edit Profile</Link>
                </div>
                <div>
                    <div>
                        <h4>Full Name</h4>
                        <p>{data.user.name}</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>{data.user.email}</p>
                    </div>
                    <div>
                        <h4>Joined On</h4>
                        <p>{String(data.user.createdAt).substr(0, 10)}</p>
                    </div>

                    <div>
                        <Link to="/order">My Orders</Link>
                        <Link to="/password/update">Change Password</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;