/* eslint-disable react/prop-types */

function Biography({ imgUrl }) {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imgUrl} alt="AboutImg" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>
          We’re thrilled that you’ve chosen to enhance your online experience
          with us. Thank you for giving us the opportunity to make your shopping
          journey smoother and more rewarding. By installing AskmeOffers Coupons
          Extension.
        </p>
        <p>Thank you for giving us the opportunity to make your shopping</p>
        <p>Thank you for giving us the opportunity to make your shopping</p>
        <p>Thank you for giving us the opportunity to make your shopping</p>
      </div>
    </div>
  );
}

export default Biography;
