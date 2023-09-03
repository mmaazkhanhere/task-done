const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='bg-gradient-to-bl from-[#ff7f50] via-[#f09c0b] to-[#ffc000] w-full h-screen'>
            {children}
        </div>
    );
}

export default RootLayout;