import ComponentWrapper from "../shared/ComponentWrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ContactBg from "./../../assets/form_bg.webp";

const Contact = () => {
      return (
            <div className="bg-cover bg-center bg-no-repeat"
                  style={{
                        backgroundImage: `url(${ContactBg.src})`
                  }}
            >
                  <ComponentWrapper>
                        <div className="min-h-[90vh] py-20">
                              <div className="flex flex-col justify-center items-center pb-20">
                                    <h3 className="text-white text-center text-4xl font-bold uppercase ">Get In Touch</h3>
                                    <p className="h-[2px] w-[100px] bg-orange-700 "></p>
                              </div>

                              <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] mx-auto">
                                    <form className="bg-black/55 p-10">
                                          <h3 className="text-white text-center text-4xl py-10 uppercase">SEND US A MESSAGE</h3>
                                          <div className="flex flex-col gap-7">
                                                <Input type="text" placeholder="Name*" className="text-lg text-white py-7 px-5 rounded-none bg-gray-600/65 border-none placeholder:text-white" required/>
                                                <Input type="text" placeholder="Phone No.*" className="text-lg text-white py-7 px-5 rounded-none bg-gray-600/65 border-none placeholder:text-white" required/>
                                                <Input type="email" placeholder="Email*" className="text-lg text-white py-7 px-5 rounded-none bg-gray-600/65 border-none placeholder:text-white" required/>
                                                {/* <Tex  /> */}
                                                <Textarea placeholder="Message*" rows={5} className="text-lg text-white py-7 px-5 rounded-none bg-gray-600/65 border-none placeholder:text-white" required/>

                                                <div className="text-center">
                                                      <Button className="text-lg uppercase bg-red-700 hover:bg-red-900 py-7 px-7 rounded-none">Send Message</Button>
                                                </div>
                                          </div>
                                    </form>
                              </div>
                        </div>
                  </ComponentWrapper>
            </div>
      );
};

export default Contact;