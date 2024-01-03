import React, { useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Rating = ({ rating, onClick }) => {

    const [arr] = useState([1, 2, 3, 4, 5]);

    return (
        <>
            {
                arr.map((_, i) => (
                    <span key={i} onClick={() => onClick(i)}>
                        {
                            rating > i ? (
                                <AiFillStar />
                            ) : (
                                <AiOutlineStar />
                            )
                        }
                    </span>
                ))
            }
        </>
    )
}

export default Rating