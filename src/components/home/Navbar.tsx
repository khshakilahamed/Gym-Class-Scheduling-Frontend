"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from "./../../assets/logo.svg";
import Link from 'next/link';
import { Button } from '../ui/button';

const menuItems = [
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
                  <div className="px-2 2xl:px-0 max-w-screen-2xl mx-auto flex items-center justify-between py-5">
                        <div>
                              <Image src={Logo} alt='brand logo' />
                        </div>
                        <div className='flex items-center gap-5'>
                              <ul className='text-white text-xl flex gap-5'>
                                    {
                                          menuItems?.map(item => (
                                                <li key={item?.id}>
                                                      <Link href={item?.href}>{item?.title}</Link>
                                                </li>
                                          ))
                                    }
                              </ul>
                              <Button className="text-lg uppercase bg-red-700 hover:bg-red-900 py-7 px-7 rounded-none">Login</Button>
                        </div>
                  </div>
            </nav>
      );
};

export default Navbar;
