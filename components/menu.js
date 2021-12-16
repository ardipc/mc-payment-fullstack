import Link from "next/link";
import { FaDownload, FaHome, FaPlusCircle, FaUpload, FaUser } from 'react-icons/fa';
import { useRouter } from "next/router";

export default function Menu(props) {
  const { pathname } = useRouter();

  const menu = [
    {name: 'Finances', icon: <FaHome />, url: '/'},
    {name: 'Spending', icon: <FaUpload />, url: '/spending'},
    {name: 'Create', icon: <FaPlusCircle />, url: '/transaction'},
    {name: 'Earning', icon: <FaDownload />, url: '/earning'},
    {name: 'Account', icon: <FaUser />, url: '/account'},
  ];
  
  return (
    <div className="mobile">
      <div className="flex-container navbar">
        {
          menu.map((item, index) => (
            <Link href={item.url} key={index}>
              <a className={item.url === pathname ? 'active' : ''}>
                <span className="d-block">
                  {item.icon}
                </span>
                {item.name}
              </a>
            </Link>
          ))
        }
      </div>
    </div>
  )
}