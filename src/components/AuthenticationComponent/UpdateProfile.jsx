import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
    const {user,updateUserProfile}=useContext(AuthContext)
    const [name, setName]=useState(user?.displayName)
    const [photoURL, setPhotoURL]=useState(user?.photoURL)

    const navigate=useNavigate()

    const handleFormInputChanges=(e)=>{
        if(e.target.name==="name"){
            setName(e.target.value)
        }
        if(e.target.name==="photoURL"){
            setPhotoURL(e.target.value)
        }
        
    }
    const UpdateProfileOnSubmit=(e)=>{
        e.preventDefault()
        const name=e.target.name.value
        const photoURL=e.target.photoURL.value
        
        updateUserProfile(name,photoURL).then(()=>{
            e.target.reset()
            navigate("/")
            toast.success("User Profile successfully updated!")
        }).catch((error) => {
            toast.error(error.message?error.message:error.code)

        });

    }
    return (
        <section>
            <div className="container hero flex items-center justify-center">

                    <div className="fromWrapper max-w-sm">
                    <h1 className="text-5xl font-bold">Update now!</h1>
                    <form onSubmit={UpdateProfileOnSubmit} className="card-body p-0">
                        <div className="form-control">
                        <label htmlFor='name' className="label">
                            <span className="">Name</span>
                        </label>
                        <input onChange={handleFormInputChanges} type='text' name="name" id="name" className="input input-ghost input-bordered" minLength={3} value={name} required />
                        </div>

                        <div className="form-control">
                        <label htmlFor='photoURL' className="label">
                            <span className="">Photo url</span>
                        </label>
                        <input onChange={handleFormInputChanges} type='text' name="photoURL" id="photoURL" className="input input-ghost input-bordered" value={photoURL}/>
                        </div>

                        <div className="form-control mt-6">
                            <button className="formSubmitBtn">Update</button>
                        </div>

                    </form>
                    </div>
            </div>
        </section>
    );
};

export default UpdateProfile;