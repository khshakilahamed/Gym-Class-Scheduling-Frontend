import Image from "next/image";
import FooterBg from "./../../assets/footer-bg.png";
import Logo from "./../../assets/logo.svg"
import ComponentWrapper from "../shared/ComponentWrapper";

const Footer = () => {
      return (
            <footer
                  style={{ backgroundImage: `url(${FooterBg.src})` }}
                  className="w-full bg-cover bg-center bg-no-repeat min-h-[200px] md:min-h-[300px]"
            >
                  <ComponentWrapper>
                        <div className="min-h-[200px] md:min-h-[300px] flex flex-col md:flex-row items-center justify-center md:justify-between gap-3">
                              <Image src={Logo} alt="brand logo" />
                              <p className="text-white text-xl">© 2024 gymate. All Rights Reserved</p>
                        </div>
                  </ComponentWrapper>
            </footer>
      );
};

export default Footer;