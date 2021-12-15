import Link from "next/link";

export default function Menu() {
  const menu = [
    {name: 'Finances', icon: '', url: '/'},
    {name: 'Spending', icon: '', url: '/spending'},
    {name: 'Earning', icon: '', url: '/earning'},
    {name: 'Account', icon: '', url: '/account'},
  ];
  
  return (
    <div className="navbar">
      {
        menu.map((item, index) => (
          <Link href={item.url} key={index}>
            <a>{item.name}</a>
          </Link>
        ))
      }
    </div>
  )
}