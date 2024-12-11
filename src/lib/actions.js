'use server'
import { redirect } from "next/navigation";
import { deleteCookie, setCookie } from "@/lib/cookies";

const usuarios = [
  {
    name: 'medico1', email: 'medico1@gmail.com', key: 'medico1'
  },
  {
    name: 'medico2', email: 'medico2@gmail.com', key: 'medico2'
  }
]

export async function login(formData) {
  const LOGIN_URL = '/'

  // Obtener usuario datos del formulario
  const name = formData.get('name')
  const email = formData.get('email')
  const key = formData.get('key')
  const callbackUrl = formData.get('callbackUrl') || LOGIN_URL

  const encontrado = usuarios.find(usuario => name === usuario.name && email === usuario.email && key === usuario.key)

  // Comprobar si credenciales son válidas
  // const authenticated = true  // suponemos que son válidas

  if (!encontrado) return

  // Si hay autenticación correcta, creamos cookie de sesión
  await setCookie('session', { name, email })

  redirect(callbackUrl);
}



export async function logout() {
  // Eliminamos cookie de sesión
  deleteCookie('session')

  // redirect("/");   // No recarga si ya estamos en esta página

  // Hack to reload page! https://github.com/vercel/next.js/discussions/49345#discussioncomment-6120148
  redirect('/?' + Math.random())
}


