import Link from "next/link";

const Header = () => {
    return (
        <header className="header flex justify-between py-3 px-0 border-b border-gray-200 mb-4">
            <h1 className="text-4xl font-bold">Yuun's Blog</h1>
            <div className="links flex items-center">
                <Link href="/" className="ml-2 font-semibold hover:text-indigo-500 hover:font-semibold">Home</Link>
                <Link href="/blogs" className="ml-2 font-semibold hover:text-indigo-500 hover:font-semibold">All Posts</Link>
                <Link href="/submit" className="ml-2 font-semibold hover:text-indigo-500 hover:font-semibold">Submit</Link>
                <Link href="/about" className="ml-2 font-semibold hover:text-indigo-500 hover:font-semibold">About</Link>
            </div>
        </header>
    );
}
 
export default Header;