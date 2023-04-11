import { FC, useEffect, useState } from 'react';
import { ChevronUp } from 'react-feather';
import { animateScroll as scroll, Link } from 'react-scroll';

import Card from '@Components/Generic/Card';
import FloatingButton from '@Components/Generic/FloatingButton';

const Landing: FC = () => {
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const screenHeight = window.innerHeight;
      if (scrolled > screenHeight) {
        setShowScrollToTopButton(true);
      } else {
        setShowScrollToTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {showScrollToTopButton && (
        <FloatingButton onClick={scrollToTop}>
          <ChevronUp className="bg-GPdarkGreen dark:bg-GPdarkBrown text-GPlightBrown dark:text-GPlight w-10 h-10 p-2 rounded-full shadow-lg" />
        </FloatingButton>
      )}
      <div className="grid justify-items-center w-full h-full -mt-24">
        <div
          className="
          justify-items-center items-center
          w-full h-[calc(100vh-64px)]
          bg-cover bg-center
          bg-sunset-mountain"
        >
          <div className="relative h-full w-full inset-0 bg-fixed bg-black bg-opacity-50">
            <div className="flex justify-center items-center h-full">
              <div className="text-center text-white px-6 md:px-12">
                <h1 className="leading-normal text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight">
                  Plan your <br />
                  perfect escape
                </h1>
                <hr className="h-px my-8 w-[20%] mx-auto" />
                <Link
                  to="mindset"
                  smooth={true}
                  duration={800}
                  className="inline-block px-7 py-3 border-2 border-white text-white font-medium text-lg leading-snug uppercase rounded hover:bg-white hover:text-black transition duration-200 ease-in-out cursor-pointer"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-12 md:gap-20 w-full md:w-[80%] lg:w-[70%] px-4 md:px-0 py-12 dark:text-GPlight">
          <div id="mindset">
            <h1 className="text-4xl font-bold py-4">Mindset</h1>
            <p>
              Our travel planner app's main goal is to motivate you to tour the
              world and make priceless experiences. We think that travelling is
              not just about simply going to new places. Travelling is about
              experiencing other cultures, cuisines, and ways of life. With the
              help of our app, we aim to help you easily arrange the vacation of
              your dreams and visit places you always wanted. Pack your luggage,
              and let's travel the world together!
            </p>
          </div>
          <div id="features">
            <h1 className="text-4xl font-bold pb-4">Features</h1>
            <h2 className="text-2xl py-2">What you already have ✅</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-8 py-6">
              <Card
                title="Personalized Itineraries"
                description="Create custom travel itineraries easily, based on your
                preferences with our intuitive interface."
                className="bg-GPmid dark:bg-GPlightGreen dark:bg-opacity-50"
              />
              <Card
                title="Budgeting"
                description="Set your budget for different expense categories, such as
                accomodation, activities, food and transportation."
                className="bg-GPmid dark:bg-GPlightGreen dark:bg-opacity-50"
              />
            </div>
            <h2 className="text-2xl py-2">What's coming? 🔜</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-8 py-6">
              <Card
                title="Multi-destionation trips"
                description="Easily plan trips with multiple destinations with an intuitive itinerary builder.
                Connect the different locations, plan your ideal trip from start to finish."
                className="bg-GPmid dark:bg-GPlightGreen dark:bg-opacity-50"
              />
              <Card
                title="Flexible Trip Scheduling"
                description="What's to point of multiple destinations, if you can't schedule them? 
                Keep your trip on track and manage your itinerary with our trip scheduling tools."
                className="bg-GPmid dark:bg-GPlightGreen dark:bg-opacity-50"
              />
              <Card
                title="Collaborative Planning"
                description="Share your
                trip with friends and family by inviting them to collaborate on
                your itinerary. Discuss ideas, keep everyone on the same page."
                className="bg-GPmid dark:bg-GPlightGreen dark:bg-opacity-50"
              />
              <Card
                title="Smart Budgeting"
                description="Track your expenses with our smart budgeting tools. Our app helps
                you save money and make the most out of your travel budget."
                className="bg-GPmid dark:bg-GPlightGreen dark:bg-opacity-50"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
