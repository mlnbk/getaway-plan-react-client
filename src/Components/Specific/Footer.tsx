import { FC } from 'react';
import { GitHub } from 'react-feather';

import { uiStore } from '@Stores/UIStore';

const Footer: FC = () => {
  return (
    <footer
      data-testid={'footer'}
      className="
        mt-auto p-4 md:p-6
        bg-GPmid dark:bg-GPdarkGreen
        text-sm
        text-GPlightGreen dark:text-GPlight
        opacity-90 dark:opacity-60
        grid justify-items-center
        h-full w-full"
    >
      <div
        className="
          grid grid-flow-row md:grid-flow-col auto-cols-auto auto-rows-auto gap-3
          w-full md:w-[80%] lg:w-[70%]"
      >
        <span className="row-start-2">
          © 2023{' '}
          <a
            href="https://github.com/mlnbk/getaway-plan-react-client"
            className="hover:underline"
          >
            mlnbk
          </a>
          <GitHub size={16} className="inline-block mx-1" />
        </span>
        <div className="form-control justify-self-start md:col-start-2 md:justify-self-end">
          <label className="label cursor-pointer grid grid-flow-col gap-1">
            {/* <span className="label-text text-xs text-GPlightGreen dark:text-GPlight text-opacity-80 dark:text-opacity-80">
              Dark Mode
            </span>
            <input
              type="checkbox"
              className="toggle toggle-sm"
              defaultChecked={uiStore.darkMode}
              onClick={uiStore.toggleDarkMode}
            /> */}
          </label>
        </div>
        <ul className="grid grid-flow-col auto-cols-max md:justify-self-end divide-x">
          <li>
            <a href="#" className="hover:underline pr-1.5">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline p-1.5">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline p-1.5">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
