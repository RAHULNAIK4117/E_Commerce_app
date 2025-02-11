const SubscribeSection = () => {
  return (
    <div className=" px-10 py-5">
      <div className="bg-green-100 rounded-xl p-8 flex flex-col md:flex-row justify-between items-center h-[400px] ">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-5xl font-semibold text-gray-800 leading-[60px] ">
            Stay home & get your daily needs from our shop
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Start Your Daily Shopping with Nest Mart
          </p>
          <div className="mt-4 flex items-center bg-white rounded-full p-2 shadow-md w-full max-w-md">
            <span className="text-gray-500 px-4">✉</span>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 outline-none border-none p-2 bg-transparent"
            />
            <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">
              Subscribe
            </button>
          </div>
        </div>
        <div className="h-full md:w-1/2 md:mt-0">
          <img
            src="https://ecommerce-fullstack-web-app.netlify.app/static/media/newsletter.5931358dd220a40019fc.png"
            alt="Subscribe"
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;
