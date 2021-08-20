import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';
import Arrow from 'img/marketing-arrow.svg';

const MarketingModule = ({copy, cta, ctaLink, img, imgAlt, title}) => (
  <div className={styles.root}>
    <div className={styles.content}>
      <p>{copy}</p>
      {cta &&
      <a className={styles.cta} href={ctaLink}>
        <span className={styles.join}>{cta}</span>
        <span className={styles.arrow}>
            <Arrow/>
          </span>
      </a>
      }
    </div>
    <img alt={imgAlt || "Marketing Module Image"} src={img}/>
  </div>
);

const z_ = (
  <div className="mb-16 px-6 space-y-20">
    <a
      className="block bg-white shadow-md border border-gray-50 overflow-hidden no-underline hover:no-underline hover:shadow-lg"
      href="/main/docs/diem-reference-wallet">
      <div className="lg:flex items-stretch">
        <div className="grid flex-grow">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-diem font-bold py-1">Try it out</div>
            <h2 className="m-0 mt-1 text-lg mt-3 leading-tight font-medium text-black hover:underline">The Official Diem
              Reference Wallet</h2>
            <p className="mt-2 text-gray-500">Explore the official Diem Reference Wallet, with full functionality and
              interactive testnet connectivity</p>
          </div>
          <div className="p-8 hidden lg:block">
            <p className="mt-2 flex justify-end">
              <div className="flex bg-diem w-12 h-12 rounded-full items-center justify-center fill-white stroke-white">
                <svg width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
                  <g stroke-width="1.5" fill-rule="evenodd" stroke-linecap="square">
                    <path d="M6.86 14.5L13.5 8 6.86 1.5M12.944 8.087H.774"></path>
                  </g>
                </svg>
              </div>
            </p>
          </div>
        </div>
        <div className="md:flex-shrink-0 w-full lg:w-1/3">
          <img className="m-0 object-cover w-full h-full"
               src="https://diem-developers-components.netlify.app/images/marketing-module.jpg"
               alt="Computer screen showing Diem wallet app"/>
        </div>
      </div>
    </a>
  </div>
);


MarketingModule.propTypes = {
  copy: PropTypes.string.isRequired,
  cta: PropTypes.string,
  ctaLink: PropTypes.string,
  img: PropTypes.string.isRequired,
  imgAlt: PropTypes.string,
  title: PropTypes.string,
};

export default MarketingModule;
