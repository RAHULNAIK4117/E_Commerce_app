const SubscribeSection = () => {
  return (
    <div className="px-4 md:px-10 py-5">
      <div className="bg-green-100 rounded-xl p-8 flex flex-col md:flex-row justify-between items-center h-auto md:h-[400px]">
        <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-xl md:text-5xl font-semibold text-gray-800 leading-[30px] md:leading-[60px]">
            Stay home & get your daily needs from our shop
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Start Your Daily Shopping with Nest Mart
          </p>
          <div className="mt-4 flex flex-col md:flex-row items-center justify-between bg-white rounded-md md:rounded-full p-2 shadow-md w-full max-w-md mx-auto md:mx-0">
            <div className="flex items-center justify-center w-full">
              <span className="hidden md:block text-gray-500 px-4">✉</span>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 w-full outline-none border-none p-2 bg-transparent"
              />
            </div>
            
            <button className="bg-green-500 text-white px-6 py-2 rounded-md md:rounded-full w-full md:w-fit hover:bg-green-600">
              Subscribe
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src="https://ecommerce-fullstack-web-app.netlify.app/static/media/newsletter.5931358dd220a40019fc.png"
            alt="Subscribe"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;
