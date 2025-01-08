import { Carousel } from 'antd';
import SeferSearch from '../../form/SeferSearch';

const CarouselC = () => {
  const onChange = (currentSlide) => {
   
  };
  return (
    <div className='relative w-full'>
      <Carousel 
        afterChange={onChange} 
        autoplay 
        autoplaySpeed={3000} 
        className='w-full'  
        dots={false} 
        effect='fade'
      >
        <div className='w-full'>
          <img 
            src="/img/banner-1.png" 
            alt="carousel" 
            className='w-full h-[300px] md:h-[600px] object-cover' 
          />
        </div>
        <div className='w-full'>
          <img 
            src="/img/banner-2.png" 
            alt="carousel" 
            className='w-full h-[300px] md:h-[600px] object-cover' 
          />
        </div>
        <div className='w-full'>
          <img 
            src="/img/banner-3.png" 
            alt="carousel" 
            className='w-full h-[300px] md:h-[600px] object-cover' 
          />
        </div>
        <div className='w-full'>
          <img 
            src="/img/banner-4.png" 
            alt="carousel" 
            className='w-full h-[300px] md:h-[600px] object-cover' 
          />
        </div>
      </Carousel>

      <div className="hidden md:flex absolute inset-0 items-center justify-center">
        <div className="w-full max-w-6xl mx-4">
          <SeferSearch />
        </div>
      </div>

      <div className="md:hidden w-full mt-2 px-0">
        <SeferSearch />
      </div>
    </div>
  );
};
export default CarouselC;