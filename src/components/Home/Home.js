import { useState } from "react";



function Home() {
    const [imagePreview, setImagePreview] = useState(null);
    const [check, setcheck] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreview(reader.result);
            setcheck(17)
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // console.log('haiiii',check);

    return (
        <>
            <div>
                <h1>Welcome To Home</h1>
            </div>
            {/* <div>
                <input type="file" accept="image/*" onChange={handleFileChange} />
            </div> */}

            <div>
                {/* <FileInputComponent onChange={handleFileChange} /> */}
                {imagePreview && (
                    <div>
                        <h2>Image Preview</h2>
                        <img src={imagePreview} alt="Preview" style={{ Width: '50px',height:'50px' }} />
                    </div>
                )}
            </div>

          
        </>
    )
}

export default Home;