import React from 'react';

const postStyles = {
    backgroundColor: 'white',
    border: '2px solid #282c34',
    borderRadius: '5px',
    margin: '0 0 20px',
    padding: '0 20px 20px' 
}


export default function Post(props) {
    

    return ( 
        <div className="Post-wrapper" style={postStyles}>
            <h3>{ props.title }</h3>
            <h6>{ props.author }</h6>

            <div className="Post-body">
                { props.body }
            </div>
            <button onClick={() => props.handleDelete(props._id)} className="btn btn-danger sm-1">Delete</button>
            <button onClick ={ props.handleEdit } className="btn btn-warning sm">Edit</button>
            
            <form onSubmit={(e) => props.handleEditSubmit(e, props._id)}>
                <div className="field-wrapper">
                    <label>Title</label>
                    <input 
                        name="title" 
                        type="text" 
                        onChange={ (e) => props.handleEditChange(e, props.idx) }
                        value={ props.title } />
                </div>
                <div className="field-wrapper">
                    <label>Author</label>
                    <input 
                        name="author" 
                        type="text" 
                        onChange={ (e) => props.handleEditChange(e, props.idx) }
                        value={ props.author } />
                </div>
                <div className="field-wrapper">
                    <label>Body</label>
                    <input 
                        name="body" 
                        type="text" 
                        onChange={ (e) => props.handleEditChange(e, props.idx) }
                        value={ props.body } />
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
 