export const NewLetter = () => {
  return (
    <section className="py-16 bg-primary-300 rounded-3xl">
      <div className="container">
        <div className="flex flex-wrap gap-4 flex-row">
          <div className="flex gap-4 flex-col">
            <h2 className="text-title leading-none">Special Offer</h2>
            <h4 className=" leading-none">
              Sign up today and get 10% off your first installation! Limited
              time offer.
            </h4>
          </div>

          <div className="flex sm:flex-row flex-col sm:gap-3 sm:items-center justify-center">
            <input
              placeholder="Your e-mail"
              className="py-3 px-6 bg-beige-primary border-secondary-700 border-2 placeholder:text-secondary-700 rounded-full sm:w-[330px] mb-3 sm:mb-0"
            />
            <button className="px-6 py-3 whitespace-nowrap bg-secondary-950 rounded-full text-white">
              Claim Your Discount
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
