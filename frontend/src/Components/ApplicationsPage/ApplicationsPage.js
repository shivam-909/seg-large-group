import React, {useState} from 'react';
import './ApplicationsPage.css'

function UploadCV () {
    const [selectedFile, setSelectedFile]= useState();
    const [isFilePicked, setIsFilePicked]= useState(false);

    const changeHandler = (event) =>{
        setSelectedFile(event.target.files[0])
        isFilePicked(true);
    };

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append('File', selectedFile);

    };

    // render(){
        return(
            <div className="pageBody">
                <h1 className= "header">Submit an application</h1>
                <h2 className="labels">Step 1: Upload you CV!</h2>
                <div>
                    {/* <input type="file" name="file" onChange={this.changeHandler}/>
                    {selectedFile ? (
                    <div className="fileLabels">
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
					    <p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
                ) : (
                    <p></p>
                )} */}
                    <div>
                        <button className= "uploadButton" onClick={onFileUpload}>Upload!</button>
                    </div>
                </div>

            </div>
        )
    }

export default UploadCV;