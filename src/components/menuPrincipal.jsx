'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  {
    text: 'Pagina Principal',
    url: '/'
  },
  {
    text: 'Pacientes-db',
    url: '/pacientes-db'
  },
  {
    text: 'Medicos-db',
    url: '/medicos-db'
  },
  {
    text: 'Pacientes-api',
    url: '/pacientes-api'
  },
  {
    text: 'Medicos-api',
    url: '/medicos-api'
  }
]

function Home() {
  const pathname = usePathname();

  return (
    <nav className="font-bold flex items-center gap-4 text-blue-500 ">

      {
        menu.map(item =>
          <Link key={item.url} href={item.url} className={`hover:underline ${pathname == item.href && 'text-black no-underline'}`} >
            {item.text}
          </Link>
        )}
    </nav>
  )
}

export default Home