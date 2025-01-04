import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-wxl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.logo_2} className="w-full md:max-w-[450px]" alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Our printing shop offers top-notch services that combine creativity,
            quality, and affordability to meet your unique needs. Whether it’s
            business materials, custom designs, or personal projects, we ensure
            every print is crafted with precision and care. Let us help you make
            a lasting impression with our reliable and professional printing
            solutions!
          </p>
          <p>
            At our printing shop, we pride ourselves on delivering exceptional
            quality and personalized service to meet all your printing needs.
            From vibrant custom designs to precise business solutions, we ensure
            every project is completed with care and efficiency. Trust us to
            bring your ideas to life with unmatched expertise and a commitment
            to excellence!
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to empower individuals and businesses by delivering
            high-quality printing solutions that inspire creativity and
            professionalism. We are dedicated to providing exceptional service,
            innovative designs, and sustainable practices to ensure every
            project exceeds expectations. At the heart of our mission is a
            commitment to helping our clients bring their visions to life with
            precision and care.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            At our printing shop, quality assurance is our top priority. We
            meticulously inspect every detail, from the choice of materials to
            the final print, ensuring that each project meets the highest
            standards. With cutting-edge technology and a dedicated team, we
            deliver results that reflect precision, consistency, and excellence
            in every print.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Our printing shop is designed with your convenience in mind. From
            seamless online ordering to quick turnarounds, we make the printing
            process easy and stress-free. Whether you need custom designs or
            last-minute prints, we’re here to deliver exactly what you need,
            when you need it.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Execeptional Customer Service:</b>
          <p className="text-gray-600">
            At our printing shop, exceptional customer service is at the heart
            of everything we do. Our friendly and knowledgeable team is always
            ready to assist you, ensuring your printing needs are met with
            professionalism and care. From personalized consultations to prompt
            responses, we’re dedicated to making your experience smooth and
            enjoyable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
