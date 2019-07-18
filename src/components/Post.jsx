import React from 'react';

const postStyles = {
    backgroundColor: 'white',
    border: '2px solid #282c34',
    borderRadius: '5px',
    margin: '0 0 20px',
    padding: '0 20px 20px' 
}

export default function Post (props){
        return ( 
            <div className="Post-wrapper" style={postStyles}>
                <h3>{ props.title }</h3>
                <h6>{ props.author }</h6>

                <div className="Post-body">
                    { props.body }
                </div>
            </div>
         );
}
 