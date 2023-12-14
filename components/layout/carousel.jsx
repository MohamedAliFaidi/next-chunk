"use client"
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";


export  function Slides() {

    return(
    <Carousel
    style={{ marginTop: "100px" }}
      className="rounded-xl overflow-hidden h-96 w-full relative my-10 shadow-2xl"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <Image
        src="/acc.png"
        alt="image 1"
        className="h-full w-full object-cover"
        width={800}
        height={500}
      />
      <Image
        src="/acc.png"
        alt="image 2"
        className="h-full w-full object-cover"
        width={800}
        height={500}
              
      />
      <Image
        src="/acc.png"
        alt="image 3"
        className="h-full w-full object-cover"
        width={800}
        height={500}
      />
    </Carousel>)
}