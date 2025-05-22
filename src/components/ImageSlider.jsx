import React, { useState } from "react";

function ImageSlider(props) {
  const images = props.images;
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-fit h-[600px]">
      <img
        src={images[currentIndex]}
        className="w-full h-[500px] object-contain rounded-xl"
      />
      <div className="w-full h-[100px] flex justify-center items-center">
        {images?.map((image, index) => {
          return (
            <img
              key={index}
              src={image}
              className={
                "w-fit h-[90px] m-2 rounded-xl object-contain cursor-pointer hover:border-2 hover:border-accent " +
                (index == currentIndex && "border-accent border-2")
              }
              onClick={() => {
                setCurrentIndex(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ImageSlider;
