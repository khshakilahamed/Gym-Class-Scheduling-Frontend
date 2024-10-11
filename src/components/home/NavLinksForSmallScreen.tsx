import React, { Dispatch, SetStateAction } from 'react';
import { menuItems } from './Navbar';
import Link from 'next/link';

const NavLinksForSmallScreen = ({ setIsShow }: { setIsShow: Dispatch<SetStateAction<boolean>> }) => {
      return (
            <div>
                  <ul className='text-white text-xl flex flex-col gap-5'>
                        {
                              menuItems?.map(item => (
                                    <li key={item?.id} className='hover:text-red-600' onClick={() => setIsShow(false)}>
                                          <Link href={item?.href}>{item?.title}</Link>
                                    </li>
                              ))
                        }
                  </ul>
            </div>
      );
};

export default NavLinksForSmallScreen;