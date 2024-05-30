import { redirect } from "next/navigation";

import HeaderBox from "./_components/HeaderBox";
import RightSidebar from "./_components/RightSidebar";
import TotalBalanceBox from "./_components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.action";

const HomePage = async () => {

  const loggedInUser = await getLoggedInUser();
  if (!loggedInUser) redirect('/sign-in');

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox type="greeting" title="Welcome" user={loggedInUser?.name || "Guest"} subtext="Access and manage your account transactions efficiently." />
          <TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1250.35} />
        </header>
      </div>
      <RightSidebar user={loggedInUser} transactions={[]} banks={[{ currentBalance: 123.50 }, { currentBalance: 123.50 }]} />
    </section>
  )
}

export default HomePage;