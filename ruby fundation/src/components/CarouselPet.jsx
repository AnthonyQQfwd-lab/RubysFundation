import React from 'react'
import { Carousel } from 'react-bootstrap';

function CarouselPet({photos}) {
  return (
    <div>
        <Carousel>
            {photos.map((photosUrl, index) =>
                <Carousel.Item key={index}>
                    <img
                        className='petPhotos'
                        src={photosUrl}
                        alt={`Pet photo ${index + 1}`}
                    />
                </Carousel.Item>
            )}
        </Carousel>
    </div>
  )
}

export default CarouselPet