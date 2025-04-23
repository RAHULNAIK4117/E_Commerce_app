import { FaTags, FaTruck, FaHandshake, FaBoxes, FaUndo } from "react-icons/fa";

const services = [
  { icon: <FaTags size={32} className="text-green-500" />, title: "Best prices & offers", subtitle: "Orders 1500 or more" },
  { icon: <FaTruck size={32} className="text-green-500" />, title: "Free delivery", subtitle: "Orders 1500 or more" },
  { icon: <FaHandshake size={32} className="text-green-500" />, title: "Great daily deal", subtitle: "Orders 1500 or more" },
  { icon: <FaBoxes size={32} className="text-green-500" />, title: "Wide assortment", subtitle: "Orders 1500 or more" },
  { icon: <FaUndo size={32} className="text-green-500" />, title: "Easy returns", subtitle: "Orders 1500 or more" },
];

export default function ServiceSection() {
  return (
    <div className="grid gap-4 py-6 px-4 md:px-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {services.map((service, index) => (
        <div
          key={index}
          className="flex items-center gap-4 py-6 px-4 bg-gray-100 shadow-md rounded-lg"
        >
          {service.icon}
          <div>
            <h3 className="font-semibold text-lg">{service.title}</h3>
            <p className="text-gray-500 text-sm">{service.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
