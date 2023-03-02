import { FC } from 'react';
import { GitHub } from 'react-feather';

const Footer: FC = () => {
  return (
    <footer
      className="
        mt-auto p-4 md:p-6
        bg-GPmid dark:bg-GPdarkGreen
        text-sm
        text-GPlightGreen dark:text-GPlight
        opacity-80
        rounded-t-lg shadow
        md:flex md:items-center md:justify-between
        h-full w-full md:w-[85%] lg:w-[75%]"
    >
      <span className="sm:text-center">
        © 2023{' '}
        <a
          href="https://github.com/mlnbk/getaway-plan-react-client"
          className="hover:underline"
        >
          mlnbk
        </a>
        <GitHub size={16} className="inline-block mx-1" />
      </span>
      <ul className="flex flex-wrap items-center mt-3 sm:mt-0">
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
