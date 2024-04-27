/* eslint-disable react/prop-types */
function Hero({ title, imageUrl }) {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          We’re thrilled that you’ve chosen to enhance your online experience
          with us. Thank you for giving us the opportunity to make your shopping
          journey smoother and more rewarding. By installing AskmeOffers Coupons
          Extension, you’ve taken the first step towards effortless savings and
          convenience. From automatic price comparisons to instant access to the
          best deals and coupons, we’re here to make your life easier. Get ready
          to shop smarter and save bigger with our extension!
        </p>
      </div>

      <div className="banner">
        <img src={imageUrl} alt="HeroImg" className="animated-image" />
        <span>
            <img src="/Vector.png" alt="vector"/>
        </span>
      </div>
    </div>
  );
}

export default Hero;
