"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from "./../../assets/logo.svg";
import Link from 'next/link';
import { Button } from '../ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import NavLinksForSmallScreen from './NavLinksForSmallScreen';

export const menuItems = [
      {
            id: 1,
            title: 'Home',
            href: "/",
      },
      {
            id: 2,
            title: 'About',
            href: "/",
      },
      {
            id: 3,
            title: 'Blog',
            href: "/",
      },
]

const Navbar = () => {
      const [isScrolled, setIsScrolled] = useState(false);
      const [isShow, setIsShow] = useState(false);

      useEffect(() => {
            const handleScroll = () => {
                  const scrollY = window.scrollY;
                  if (scrollY > 0) {
                        setIsScrolled(true);
                  } else {
                        setIsScrolled(false);
                  }
            };

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      return (
            <nav className={`sticky top-0 w-full transition-all duration-300 ${isScrolled ? 'bg-black/55 backdrop-blur-sm' : 'bg-black'}`}>
                  <div className="px-2 2xl:px-0 max-w-screen-2xl mx-auto flex items-center justify-between py-5 relative">
                        <div>
                              <Image src={Logo} alt='brand logo' />
                        </div>
                        <div className='flex items-center gap-5'>
                              <ul className='text-white text-xl hidden md:flex gap-5'>
                                    {
                                          menuItems?.map(item => (
                                                <li key={item?.id}>
                                                      <Link href={item?.href}>{item?.title}</Link>
                                                </li>
                                          ))
                                    }
                              </ul>
                              <Button className="md:text-lg uppercase bg-red-700 hover:bg-red-900  py-3 md:py-7 px-3 md:px-7 rounded-none">Login</Button>
                              <Button className='block md:hidden' onClick={() => setIsShow(prev => !prev)}>
                                    <HamburgerMenuIcon />
                              </Button>
                        </div>
                        <div className={`${isShow ? "block absolute left-0 right-0 top-[90px]" : "hidden -top-[90px]"} bg-black  pl-5 pb-5 transition-all duration-500`}>
                              <NavLinksForSmallScreen setIsShow={setIsShow}/>
                        </div>
                  </div>
            </nav>
      );
};

export default Navbar;
