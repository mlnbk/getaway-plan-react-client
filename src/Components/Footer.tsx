import { FC } from 'react';
import { GitHub } from 'react-feather';

const Footer: FC = () => {
  return (
    <footer className="mt-auto p-4 bg-GPmid1 dark:bg-GPmid2 opacity-70 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 h-full w-full md:w-[85%] lg:w-[75%]">
      <span className="text-GPdark dark:text-GPlight text-sm sm:text-center">
        © 2023{' '}
        <a
          href="https://github.com/mlnbk/getaway-plan-react-client"
          className="hover:underline"
        >
          mlnbk
        </a>
        <GitHub size={16} className="inline-block mx-1" />
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-GPdark dark:text-GPlight sm:mt-0">
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6 ">
            About
          </a>
        </li>
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
