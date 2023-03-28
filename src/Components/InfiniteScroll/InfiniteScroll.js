import React, {useState, useEffect, useRef} from "react";
import './InfiniteScroll.css'
import {v4 as uuidv4} from "uuid"

function InfiniteScroll () {

    const [dataImg, setDataImg] = useState([[],[],[]])
    const [pageIndex, setPageIndex] = useState(1)
    const [searchState, setSearchState] = useState('random')

    const handleSearch = (e) => {
        e.preventDefault()
    }

    const infiniteFetchData = () => {
        fetch(`https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchState}&client_id=pOf0-VIT5UtbJytFS2YKgW126aWK4nzTtoynhF_EBlk`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                const imgsReceived = [];
                data.results.forEach((img) => {
                    imgsReceived.push(img.urls.regular)
                })
                const newState = [
                    [...dataImg[0]],
                    [...dataImg[1]],
                    [...dataImg[2]],
                ]
                let index = 0
                for(let i = 0; i < 3; i++) {
                    for (let j = 0; j < 10 ; j++) {
                        newState[i].push(imgsReceived[index])
                        index += 1
                    }
                }

                setDataImg(newState)

        })
    }

    useEffect(() => {
        infiniteFetchData()
    }, [pageIndex])

    const inpRef = useRef()

    return (
        <div className='container'>
            <form onSubmit={handleSearch}>
                <label htmlFor="search">Votre recherche</label>
                <input type="text" id="search" ref={inpRef} />
            </form>
            <div className="card-list">
                <div>
                    {
                        dataImg[0].map(img => {
                            return <img key={uuidv4()} src={img} alt='img' />
                        })
                    }
                </div>
                <div>
                    {
                        dataImg[1].map(img => {
                            return <img key={uuidv4()} src={img} alt='img' />
                        })
                    }
                </div>
                <div>
                    {
                        dataImg[2].map(img => {
                            return <img key={uuidv4()} src={img} alt='img' />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default InfiniteScroll