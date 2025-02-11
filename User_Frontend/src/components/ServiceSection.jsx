import { FaTags, FaTruck, FaHandshake, FaBoxes, FaUndo } from "react-icons/fa";

const services = [
  { icon: <FaTags size={32} className="text-green-500" />, title: "Best prices & offers", subtitle: "Orders $50 or more" },
  { icon: <FaTruck size={32} className="text-green-500" />, title: "Free delivery", subtitle: "Orders $50 or more" },
  { icon: <FaHandshake size={32} className="text-green-500" />, title: "Great daily deal", subtitle: "Orders $50 or more" },
  { icon: <FaBoxes size={32} className="text-green-500" />, title: "Wide assortment", subtitle: "Orders $50 or more" },
  { icon: <FaUndo size={32} className="text-green-500" />, title: "Easy returns", subtitle: "Orders $50 or more" },
];

export default function ServiceSection() {
  return (
    <div className="flex justify-between gap-2 py-6 px-10 ">
      {services.map((service, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-10 bg-gray-100 shadow-md rounded-lg w-68"
        >
          {service.icon}
          <div>
            <h3 className="font-semibold text-lg">{service.title}</h3>
            <p className="text-gray-500 text-lg">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
