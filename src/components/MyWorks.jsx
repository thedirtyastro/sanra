import React from 'react';
import pic1 from "../assets/images/pic1.jpeg";
import pic2 from "../assets/images/pic2.jpeg";
import pic3 from "../assets/images/pic3.jpeg";
import pic4 from "../assets/images/pic4.jpeg";
import pic5 from "../assets/images/pic5.jpeg";
import pic6 from "../assets/images/pic6.jpeg";
import pic7 from "../assets/images/pic7.jpeg";
import pic8 from "../assets/images/pic8.jpeg";
import pic9 from "../assets/images/pic9.jpeg";
import pic10 from "../assets/images/pic10.jpeg";
import pic11 from "../assets/images/pic11.jpeg";

const MyWorks = () => {
    return (
        <div>
        <h1 className="text-4xl text-center mt-10 mb-8 font-bold"> My Works</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 px-6">
            <div className="column">
                <img src={pic1} alt="" className="w-full h-full object-cover" />
                <img src={pic2} alt="" className="w-full h-full object-cover" />
                <img src={pic3} alt="" className="w-full h-full object-cover" />
                <img src={pic4} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="column">
                <img src={pic5} alt="" className="w-full h-full object-cover" />
                <img src={pic6} alt="" className="w-full h-full object-cover" />
                <img src={pic7} alt="" className="w-full h-full object-cover" />
                <img src={pic8} alt="" className="w-full h-full object-cover" />
                <img src={pic9} alt="" className="w-full h-full object-cover" />
                <img src={pic10} alt="" className="w-full h-full object-cover" />
                <img src={pic11} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="column">
                <img src={pic1} alt="" className="w-full h-full object-cover" />
                <img src={pic2} alt="" className="w-full h-full object-cover" />
                <img src={pic3} alt="" className="w-full h-full object-cover" />
                <img src={pic4} alt="" className="w-full h-full object-cover" />
                <img src={pic5} alt="" className="w-full h-full object-cover" />
                <img src={pic6} alt="" className="w-full h-full object-cover" />
                <img src={pic7} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="column">
                <img src={pic8} alt="" className="w-full h-full object-cover" />
                <img src={pic9} alt="" className="w-full h-full object-cover" />
                <img src={pic10} alt="" className="w-full h-full object-cover" />
                <img src={pic11} alt="" className="w-full h-full object-cover" />
                <img src={pic1} alt="" className="w-full h-full object-cover" />
                <img src={pic2} alt="" className="w-full h-full object-cover" />
                <img src={pic3} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="column">
                <img src={pic4} alt="" className="w-full h-full object-cover" />
                <img src={pic5} alt="" className="w-full h-full object-cover" />
                <img src={pic6} alt="" className="w-full h-full object-cover" />
                <img src={pic7} alt="" className="w-full h-full object-cover" />
            </div>
        </div>
    </div>

    );
};

export default MyWorks;
