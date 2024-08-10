import React from "react";

const TrustedBy = () => {
  return (
    <div className="trustedBy bg-[#fafafa] h-[13vh] flex justify-center overflow-hidden">
      <div className="container max-w-[2000px]  flex items-center gap-5 text-[rgb(200,200,200)] font-semibold justify-center">
        <span>Trusted by :</span>
        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png" alt="Facebook" className="h-[9.1vh] object-contain" />
        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png" alt="Google" className="h-[9.1vh] object-contain" />
        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png" alt="Netflix" className="h-[9.1vh] object-contain" />
        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.6dc32e4.png" alt="Procter & Gamble" className="h-[9.1vh] object-contain" />
        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png" alt="PayPal" className="h-[9.1vh] object-contain" />
      </div>
    </div>
  );
};

export default TrustedBy;
