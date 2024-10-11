import ComponentWrapper from '../shared/ComponentWrapper';
import heroBg from './../../assets/bg-hero.jpg'

const Banner = () => {
      return (
            <div
                  className='h-[90vh] w-full bg-cover bg-center bg-no-repeat text-white'
                  style={{
                        backgroundImage: `url(${heroBg.src})`
                  }}
            >
                  {/* <Navbar /> */}
                  <ComponentWrapper>
                        <div className='h-[90vh] flex items-center'>
                              <div className='lg:w-[50%] pb-10'>
                                    <h2 className='text-5xl lg:text-6xl font-bold flex flex-col gap-2 font-geist-sans'><span>MAKE YOUR BODY</span> <span>HEALTHY & FIT</span></h2>
                                    <p className='text-lg lg:text-xl mt-2'>Discover fitness excellence at our premier gym. With top-notch equipment, expert trainers, and dynamic classes, we&lsquo;re committed to helping you reach your goals. Join us today and unleash your full potential!</p>
                              </div>
                        </div>
                  </ComponentWrapper>

            </div>
      );
};

export default Banner;