import Image from "next/image";
import { useRouter } from "next/navigation";

import { logOut } from "@/lib/actions/user.action";

const Footer = ({ user }: FooterProps) => {

  const router = useRouter();

  const handleLogoutAction = async () => {
    const loggedOut = await logOut();
    if (loggedOut) router.push("/sign-in");
  };

  return (
    <footer className="footer">
      <div className="footer_name-mobile md:footer_name">
        <p className="text-xl font-bold text-gray-700">{user.name[0]}</p>
      </div>
      <div className="footer_email-mobile md:footer_email">
        <h1 className="text-14 truncate font-semibold text-gray-600">{user.name}</h1>
        <p className="text-14 truncate font-normal text-gray-600">{user.email}</p>
      </div>
      <div className="footer_image" onClick={handleLogoutAction}>
        <Image src="/icons/logout.svg" alt="Logout" fill />
      </div>
    </footer>
  )
}

export default Footer;