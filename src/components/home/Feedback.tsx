import Image from "next/image";
import Testimonial from "./../../assets/testimonial.jpg"
import ComponentWrapper from "../shared/ComponentWrapper";

const Feedback = () => {
      return (
            <div className="my-24 min-h-[50vh] font-geist-sans">
                  <ComponentWrapper>
                        <div className="md:flex gap-10 items-center">
                              <div className="md:w-[40%]">
                                    <Image className="md:w-full md:h-full" src={Testimonial} alt="testimonial image" />
                              </div>
                              <div className="md:w-[60%] h-full flex flex-col gap-3 lg:gap-5">
                                    <h2 className="text-6xl lg:text-8xl font-bold uppercase font-geist-mono">Feedback</h2>
                                    <div>
                                          <p className="text-lg lg:text-xl">This gym has transformed my fitness journey. The trainers are experienced, the classes are varied, and the community is supportive. I&lsquo;ve never felt healthier or more motivated. Highly recommend!, and the community is welcoming. I&lsquo;ve ever been more fit or motivated. Absolutely recommend</p>
                                    </div>
                                    <div className="my-5 md:my-10">
                                          <p className="h-[2px] w-[200px] bg-orange-600 my-2"></p>
                                          <h3 className="text-xl font-bold font-geist-mono">Robert Brush</h3>
                                          <p className="font-geist-sans">From Canada</p>
                                    </div>
                              </div>
                        </div>
                  </ComponentWrapper>
            </div>
      );
};

export default Feedback;