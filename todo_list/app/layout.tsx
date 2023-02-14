//import './globals.css'

import { url } from "inspector"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body style={{ backgroundImage: url('https://wallpapercave.com/wp/wp4468334.jpg') }}>
        <h1 style={{ color: 'whitesmoke', alignItems: 'center', backgroundColor: 'black' }}>
          To Do List App
        </h1>
        {children}
      </body>
    </html>
  )
}
